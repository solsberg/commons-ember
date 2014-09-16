import Ember from 'ember';

export default Ember.Controller.extend({
  // email: '',
  // password: '',

  actions: {
    register: function(){
      var self = this;
      self.get('auth').createUser(self.get('email'), self.get('password')).then(function(user){
        //create user model
        var new_user = self.store.createRecord('user', {
          uid: user.uid,
          email: user.email,
          username: self.get('username'),
          fullname: self.get('fullname')
        });
        Ember.$(document).trigger('ajaxSend');
        new_user.save().then(function(user){
          //login user
          Ember.$(document).trigger('ajaxComplete');
          self.get('auth').login(user.get('email'), self.get('password')).then(function(/*result*/){
            self.transitionToRoute('index');
          });
        });
      }, function(error){
        alert("registration error: " + error);
      });
    }
  }
});
