import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve){
      //get user model
      self.store.find('user', {uid: self.get('session.user.uid')}).then(function(users){
        var user = users.get('firstObject');
        user.get('profile_responses').then(function(responses){
          //users have responses
          self.store.find('profile-question').then(function(questions){
            resolve(questions.map(function(question){
              return {
                question: question,
                response: responses.findBy('question_id', parseInt(question.get('id'), 10))
              };
            }));
          });
        });
      });
    });
  }
});
