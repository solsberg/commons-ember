import Ember from 'ember';

export default Ember.Object.extend({
  fetch: function() {
    var user = this.get('user'),
        store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve){
      Ember.RSVP.hash({
        responses: user.get('profileResponses'),
        sections: store.find('profile-section'),
        questions: store.find('profile-question')
      }).then(function(results){
        resolve({
          user,
          sections: results.sections,
          fields: results.questions.map(function(question){
            var response = results.responses.findBy('questionId', parseInt(question.get('id'), 10));
            return Ember.Object.create({
              question: question,
              response: response
            });
          })
        });
      });
    });
  }
});