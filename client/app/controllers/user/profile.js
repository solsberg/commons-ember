import Ember from 'ember';

export default Ember.Controller.extend({

  changes: [],
  field_components: [],

  section_titles: function(){
    return this.get('model.sections').map(function(data){
      return data.section.get('title');
    });
  }.property(),

  section_data: function(){
    return this.get('model.sections').map(function(data){
      return data.fields;
    });
  }.property(),

  actions: {
    register_field: function(field){
      this.get('field_components').push(field);
    },

    editedField: function(question, new_value){
      var change = this.get('changes').find(function(item){
        return item.question.get('id') === question.get('id');
      });
      if (change === undefined){
        change = {
          question: question,
          response: this.findResponseForQuestion(question)
        };
        this.get('changes').push(change);
      }
      change.value = new_value;
      console.log(`edited question ${question.get('id')}; new value: ${new_value}`);

    },

    saveChanges: function(){
      var store = this.store;
      var user = this.get('model.user');
      this.get('changes').forEach(function(change){
        var response = change.response;
        var text = change.value !== undefined ? change.value.trim() : '';

        if (text === ''){
          if (response !== undefined){
            //should always be true
            response.destroyRecord();
          }
          return;
        }

        if (response === undefined){
          response = store.createRecord('profile-response', {
            questionId: change.question.get('id'),
            user: user
          });
        }
        response.set('text', text);
        response.save();
      });
      this.set('changes', []);
      this.get('field_components').forEach((field) => {
        field.reset();
      });
    },

    cancel: function(){
      this.get('changes').forEach(function(change){
        var response = change.response;
        if (response.get('id') !== undefined){
          response.rollback();
        }
        else{
          response.set('text', '');
        }
        // change.question.set('edited', false);
      });
      this.set('changes', []);
      this.get('field_components').forEach((field) => {
        field.reset();
      });
    }
  },

  findResponseForQuestion: function(question){
    var response;
    this.get('model.sections').forEach(function(section){
      section.fields.forEach(function(field){
        if (field.question.get('id') === question.get('id')){
          response = field.response;
        }
      });
    });
    return response;
  }
});
