import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function(){
      this.controller.set('email', '');
      this.controller.set('password', '');
    }
  }
});