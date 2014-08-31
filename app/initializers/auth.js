import Ember from 'ember';

var Ref = new window.Firebase('https://jmr-commons.firebaseio.com');

var auth = Ember.Object.extend({
  authorized: false,
  init: function(){
    this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, user){
      if (error){
        alert("Authentication failed: " + error);
      }
      else if (user){
        this.set('authorized', true);
      }
      else{
        this.set('authorized', false);
      }
    }.bind(this));
  },

  login: function(email, password){
    this.authClient.login('password', {
      email: email,
      password: password
    });
  },

  logout: function(){
    this.authClient.logout();
  }
});

export default {
  name: 'auth',

  initialize: function(container, app) {
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};
