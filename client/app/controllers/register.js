import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service('user'),
  needs: ['notice'],

  actions: {
    register: function(){
      var self = this;
      this.get('userService').createUser({
        email: self.get('email'),
        password: self.get('password'),
        password_confirmation: self.get('password_confirmation'),
        username: self.get('username'),
        fullname: self.get('fullname')
      }).then(function(response){
        var info = response;  
        self.get('controllers.notice').set('message', "Your registration for an account on JMR Commons has been accepted. " +
            "Please look for a confirmation email in your inbox and click on the link to activate your account.");
        self.transitionToRoute('notice');
        return info;
      }, function(error){
        var err = error;
        return err;
      });
    }
  }
});
