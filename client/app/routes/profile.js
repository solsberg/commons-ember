import Ember from 'ember';

export default Ember.Route.extend({
  initx: function(){
    var self = this;
    this.get('auth').addObserver('current_user', function(){
      //in case current user set after controller initialized
      if (self.controller){
        self.controller.set('model', self.get('auth').get('current_user'));
      }
    });
  },

  setupController: function(controller){
    controller.set('model', this.get('session.user'));
  }
});