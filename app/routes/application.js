import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    logout: function(){
      var self = this;
      this.get('auth').logout().then(function(){
        self.transitionTo('index');
      });
    }
  }
});