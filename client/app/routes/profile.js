import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var store = this.store;
    return new Ember.RSVP.Promise(function(resolve){
      //get user model
      store.find('user', {uid: this.get('session.user.uid')}).then(function(users){
        var user = users.get('firstObject');
        Ember.RSVP.hash({
          responses: user.get('profile_responses'),
          sections: store.find('profile-section'),
          questions: store.find('profile-question')
        }).then(function(results){
          resolve(results.sections.map(function(section){
            return {
              section: section,
              fields: section.get('questions').map(function(question){
                return {
                  question: question,
                  response: results.responses.findBy('question_id', parseInt(question.get('id'), 10)),
                  user: user
                };
              })
            };
          }));
        });
      });
    }.bind(this));
  }
});
