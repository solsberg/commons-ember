import Ember from 'ember';

export default Ember.Route.extend({
  init: function(){
    var self = this;
    this.get('auth').addObserver('current_user', function(){
      //in case current user set after controller initialized
      if (self.controller){
        self.controller.set('model', self.get('auth').get('current_user'));
      }
      // var user = self.get('auth').get('current_user');
      // if (user != null){
      //   self.controller.set('username', user.get('username'));
      //   self.controller.set('fullname', user.get('fullname'));
      // }
    });
  },

  setupController: function(controller){
    controller.set('model', this.get('auth').get('current_user'));
  }

  // model: function(){
  //   return this.get('auth').get('current_user');
  // }
});