import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function(){
      this.controller.set('email', '');
      this.controller.set('password', '');
    },

    login: function(){
      var self = this,
          controller = this.controller;
      this.userService.findByUsername(controller.get('username')).then(function(user){
        return self.get('auth').login(user.get('email'), controller.get('password'));
      }).then(function(/*result*/){
        self.transitionTo('index');
      });
    }
  }
});