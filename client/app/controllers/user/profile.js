import Ember from 'ember';

export default Ember.Controller.extend({

  field_components: [],

  section_titles: Ember.computed(function(){
    return this.get('model.sections').map(function(data){
      return data.get('title');
    });
  }),

  section_data: Ember.computed(function(){
    var questions_by_section_id = this.get('model.fields').reduce((rslt, field) => {
      var section_id = field.get('question.section.id');
      if (rslt[section_id] === undefined){
        rslt[section_id] = [];
      }
      rslt[section_id].push(field);
      return rslt;
    }, {});
    return this.get('model.sections').map(function(section){
      return questions_by_section_id[section.get('id')];
    });
  }),

  showingTransitionModal: false,
  previousTransition: undefined,

  showTransitionModal: function(transition){
   this.set('showingTransitionModal', true);
   this.set('previousTransition', transition);
  },

  responseNeedsSaving: function(response){
    return !!response && response.get('isDirty') &&
      !(response.get('isNew') && response.get('text').trim() === '');
  },

  actions: {
    register_field: function(field){
      this.get('field_components').push(field);
    },

    editedField: function(question, new_value){
      var field = this.get('model.fields').find(f => f.question === question);
      var response = field.get('response');
      var text = !!new_value ? new_value.trim() : '';

      if (response === undefined){
        response = this.store.createRecord('profile-response', {
          questionId: field.get('question.id')
        });
        field.set('response', response);
      }
      response.set('text', text);

      console.log(`edited question ${question.get('id')}; new value: ${new_value}`);
    },

    saveChanges: function(){
      this.get('model.fields').forEach((field) => {
        var response = field.get('response');

        if (!!response && this.responseNeedsSaving(response)){
          if (response.get('isNew')){
            response.set('user', this.get('model.user'));
          }
          else if (response.get('text').trim() === ''){
            this.store.deleteRecord(response);
            field.set('response', undefined);
          }
          response.save();
        }
      });
      this.reset_fields();
      if (this.get('showingTransitionModal') && this.get('previousTransition') !== undefined){
        this.get('previousTransition').retry();
      }
    },

    cancel: function(){
      this.get('model.fields').forEach(function(field){
        var response = field.get('response');

        if (!!response){
          if (response.get('isNew')){
            response.set('text', '');
          }
          else if (response.get('isDirty')){
            response.rollback();
          }
        }
      });

      this.reset_fields();
      if (this.get('showingTransitionModal') && this.get('previousTransition') !== undefined){
        this.get('previousTransition').retry();
      }
    }
  },

  reset_fields: function(){
    this.get('field_components').forEach((component) => {
      var question = component.get('question');
      var field = this.get('model.fields').find(f => f.question === question);
      var response = field.get('response');
      if (!!response){
        component.reset(response.get('text'));
      }
    });
  },

  hasPendingChanges: function(){
    return !!this.get('model.fields').find(f => this.responseNeedsSaving(f.response));
  },

  reset: function(){
    this.set('field_components', []);
    this.set('showingTransitionModal', false);
    this.set('previousTransition', undefined);
  }
});
