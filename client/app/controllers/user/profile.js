import Ember from 'ember';

export default Ember.Controller.extend({
  // itemController: 'user/profile-section',
  // sortProperties: ['section.order'],

  changes: [],

  section_info: function(){
    return this.get('model.sections').map(function(data){
      return {
        title: data.section.get('title'),
        dom_id: 'section-' + data.section.get('id'),
        dom_href: '#section-' + data.section.get('id'),
        fields: data.fields
      };
    });
  }.property('model'),

  actions: {
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
      // this.forEach(function(item){
      //   item.saveChanges();
      // });
      this.get('changes').forEach(function(change){
        var response = change.response;
        var text = change.value.trim();
        // if (this.get('is_date')) {
        //   var date = this.get('current_date');
        //   if (!date){
        //     if (response !== undefined){
        //       //should always be true
        //       response.destroyRecord();
        //     }
        //     return;
        //   }

        //   if (response === undefined){
        //     response = this.store.createRecord('profile-response', {
        //       questionId: this.get('question.id'),
        //       user: this.get('user')
        //     });
        //   }
        //   response.set('text', date.toUTCString());
        //   response.save();
        //   return;
        // }

        if (text === ''){
          if (response !== undefined){
            //should always be true
            response.destroyRecord();
          }
          return;
        }

        if (response === undefined){
          response = this.store.createRecord('profile-response', {
            questionId: change.question.get('id'),
            user: this.get('model')[0].fields[0].user
          });
        }
        response.set('text', text);
        response.save();

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
