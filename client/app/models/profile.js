import Ember from 'ember';

export default Ember.Object.extend({
  fields: Ember.A(),

  fetch: function() {
    var user = this.get('user'),
        store = this.get('store');

    var self = this;
    return new Ember.RSVP.Promise(function(resolve){
      //make sure all sections are loaded before questions
      store.findAll('profile-section').then(sections => {
        self.set('sections', sections);
        return Ember.RSVP.hash({
          responses: user.get('profileResponses'),
          // sections: store.findAll('profile-section'),
          questions: store.findAll('profile-question')
        });
      }).then(function(results){
        // self.set('sections', results.sections);
        self.set('fields', results.questions.map(function(question){
          var response = results.responses.findBy('questionId', parseInt(question.get('id'), 10));
          return Ember.Object.create({
            question: question,
            response: response
          });
        }));
        resolve(self);
      });
    });
  },

  fields_by_section: Ember.computed('fields.@each', function(){
    var questions_by_section_id = this.get('fields').reduce((rslt, field) => {
      var section_id = field.get('question.section.id');
      if (rslt[section_id] === undefined){
        rslt[section_id] = [];
      }
      rslt[section_id].push(field);
      return rslt;
    }, {});
    return this.get('sections').map(function(section){
      return {
        title: section.get('title'),
        fields: questions_by_section_id[section.get('id')]
      };
    });
  }),

  responseNeedsSaving: function(response){
    return !!response && response.get('hasDirtyAttributes') &&
      !(response.get('isNew') && response.get('text').trim() === '');
  },

  hasPendingChanges: function(){
    return !!this.get('fields').find(f => this.responseNeedsSaving(f.response));
  },

  updateResponse: function(question, new_value){
    var field = this.get('fields').find(f => f.question === question);
    var response = field.get('response');
    var text = !!new_value ? new_value.trim() : '';

    if (response === undefined){
      response = this.get('store').createRecord('profile-response', {
        questionId: field.get('question.id')
      });
      field.set('response', response);
    }
    response.set('text', text);

    console.log(`edited question ${question.get('id')}; new value: ${new_value}`);
  },

  save: function(){
    this.get('fields').forEach((field) => {
      var response = field.get('response');

      if (!!response && this.responseNeedsSaving(response)){
        if (response.get('isNew')){
          response.set('user', this.get('user'));
        }
        else if (response.get('text').trim() === ''){
          this.get('store').deleteRecord(response);
          field.set('response', undefined);
        }
        response.save();
      }
    });
    // this.reset_fields();
    // this.sendAction('didComplete');
  },

  cancel: function(){
    this.get('fields').forEach(function(field){
      var response = field.get('response');

      if (!!response){
        if (response.get('isNew')){
          response.set('text', '');
        }
        else if (response.get('hasDirtyAttributes')){
          response.rollbackAttributes();
        }
      }
    });

    // this.reset_fields();
    // this.sendAction('didComplete');
  }
});