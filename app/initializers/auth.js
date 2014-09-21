import Ember from 'ember';
// import userService from '../services/user';

var Ref = new window.Firebase('https://jmr-commons.firebaseio.com');

var auth = Ember.Object.extend({
  authorized: false,
  current_user: null,
  defer: null,
  init: function(){
    this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, user){
      var defer = this.get('defer');
      var self = this;
      Ember.$(document).trigger('ajaxComplete');
      if (this.get('isDestroyed')){
        return;
      }
      Ember.run(function(){
      if (error){
        // alert("Authentication failed: " + error);
        if (defer != null){
          defer.reject(error);
        }
      }
      else if (user){
        //find user model
        self.set('authorized', true);
        self.userService.findByUid(user.uid).then(function(found_user){
          self.set('current_user', found_user);
        });
        if (defer != null){
          defer.resolve({auth: true});
        }
      }
      else{
        self.set('authorized', false);
        if (defer != null){
          defer.resolve({auth: true});
        }
      }
      self.set('defer', null);
    });
    }.bind(this));
  },

  login: function(email, password){
    var self = this;
    var defer = this.get('defer');
    if (defer != null){
      defer.reject();
    }
    defer = Ember.RSVP.defer();
    this.set('defer', defer);

    Ember.$(document).trigger('ajaxSend');
    self.authClient.login('password', {
      email: email,
      password: password
    });
    return defer.promise;
  },

  logout: function(){
    var self = this;
    var defer = this.get('defer');
    if (defer != null){
      defer.reject();
    }
    defer = Ember.RSVP.defer();
    this.set('defer', defer);
    Ember.$(document).trigger('ajaxSend');
    self.authClient.logout();
    return defer.promise;
  },

  createUser: function(email, password){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$(document).trigger('ajaxSend');
      self.authClient.createUser(email, password, function(error, user){
        Ember.$(document).trigger('ajaxComplete');
        if (error){
          reject(error);
        }
        else{
          resolve(user);
        }
      });
    });
  },

  deleteUser: function(email, password){
    this.authClient.removeUser(email, password);
  }
});

export default {
  name: 'auth',

  initialize: function(container, app) {
    window.App = app;
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};
