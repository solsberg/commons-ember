import Ember from 'ember';

export default Ember.Object.extend({
  sections: Ember.computed(function() {
    var user = this.get('user'),
        store = this.get('store');
    return new Ember.RSVP.Promise(function(resolve){
      Ember.RSVP.hash({
        responses: user.get('profileResponses'),
        sections: store.find('profile-section'),
        questions: store.find('profile-question')
      }).then(function(results){
        resolve(results.sections.map(function(section){
          return {
            section: section,
            fields: section.get('questions').map(function(question){
              return {
                question: question,
                response: results.responses.findBy('questionId', parseInt(question.get('id'), 10)),
                user: user
              };
            })
          };
        }));
      });
    });
  })
});