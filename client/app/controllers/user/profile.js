import Ember from 'ember';

export default Ember.Controller.extend({

  changes: [],
  field_components: [],

  section_titles: Ember.computed(function(){
    return this.get('model.sections').map(function(data){
      return data.section.get('title');
    });
  }),

  section_data: Ember.computed(function(){
    return this.get('model.sections').map(function(data){
      return data.fields;
    });
  }),

  showingTransitionModal: false,
  previousTransition: undefined,

  showTransitionModal: function(transition){
   this.set('showingTransitionModal', true);
   this.set('previousTransition', transition);
  },

  actions: {
    register_field: function(field){
      this.get('field_components').push(field);
    },

    editedField: function(question, new_value){
      var change = this.get('changes').find(function(item){
        return item.question.get('id') === question.get('id');
      });
      if (change === undefined){
        var field = this.findFieldInfoForQuestion(question);
        change = {
          question: question,
          response: field.response,
          field: field
        };
        this.get('changes').push(change);
      }
      change.value = new_value;
      console.log(`edited question ${question.get('id')}; new value: ${new_value}`);

    },

    saveChanges: function(){
      var store = this.store;
      var user = this.get('model.user');
      var field;
      this.get('changes').forEach(function(change){
        var response = change.response;
        var text = change.value !== undefined ? change.value.trim() : '';

        if (text === ''){
          if (response !== undefined){
            //should always be true
            response.destroyRecord();
            field = change.field;
            field.set('response', undefined);
          }
          return;
        }

        if (response === undefined){
          response = store.createRecord('profile-response', {
            questionId: change.question.get('id'),
            user: user
          });
          field = change.field;
          field.set('response', response);
        }
        response.set('text', text);
        response.save();
      });
      this.set('changes', []);
      this.reset_fields();
      if (this.get('showingTransitionModal') && this.get('previousTransition') !== undefined){
        this.get('previousTransition').retry();
      }
    },

    cancel: function(){
      this.get('changes').forEach(function(change){
        var response = change.response;
        if (response === undefined){
          return;
        }
        if (response.get('id') !== undefined){
          response.rollback();
        }
        else{
          response.set('text', '');
        }
      });
      this.set('changes', []);
      this.reset_fields();
      if (this.get('showingTransitionModal') && this.get('previousTransition') !== undefined){
        this.get('previousTransition').retry();
      }
    }
  },

  reset_fields: function(){
    this.get('field_components').forEach((field) => {
      var question = field.get('question');
      var field_info = this.findFieldInfoForQuestion(question);
      field.reset(field_info.get('response.text'));
    });
  },

  findFieldInfoForQuestion: function(question){
    var this_field;
    this.get('model.sections').forEach(function(section){
      section.fields.forEach(function(field){
        if (field.question.get('id') === question.get('id')){
          this_field = field;
        }
      });
    });
    return this_field;
  }
});
