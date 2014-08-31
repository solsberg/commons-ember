import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',

  init: function(){
    var self = this;
    this.get('auth').addObserver('authorized', function(){
      self.transitionToRoute('index');
    });
  },

  actions: {
    login: function(){
      this.get('auth').login(this.get('email'), this.get('password'));
    }
  }
});
