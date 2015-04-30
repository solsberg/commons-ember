import Ember from 'ember';
import AuthenticatorsBase from 'simple-auth/authenticators/base';
import AuthorizersBase from 'simple-auth/authorizers/base';
import config from '../config/environment';
// import userService from '../services/user';

var CustomAuthenticator = AuthenticatorsBase.extend({
  authenticate: function(credentials) {
    // var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: config.authHost + '/auth/sign_in',
        data: {email: credentials.identification, password: credentials.password}
      }).then(function(response, statusText, xhr){
        Ember.run(function() {
          resolve({
            user: response.data,
            auth_info: {
              access_token: xhr.getResponseHeader('Access-Token'),
              client: xhr.getResponseHeader('Client'),
              expiry: xhr.getResponseHeader('Expiry')
            }
          });
        });
      }, function(xhr/*, status, error*/) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  restore: function(properties) {
    var propertiesObject = Ember.Object.create(properties);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(propertiesObject.get('user'))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve/*, reject*/) {
      Ember.$.ajax({
        type: 'DELETE',
        url: config.authHost + '/auth/sign_out'
      }).then(function(){
        resolve();
      }, function(){
        resolve();
      });
    });
  }
});

var CustomAuthorizer = AuthorizersBase.extend({
  authorize: function(jqXHR, requestOptions) {
    var session = this.get('session');
    if (this.get('session.isAuthenticated')){
      jqXHR.setRequestHeader('uid', session.get('user.uid'));
      jqXHR.setRequestHeader('access_token', session.get('auth_info.access_token'));
      jqXHR.setRequestHeader('token_type', 'Bearer');
      jqXHR.setRequestHeader('client', session.get('auth_info.client'));
      jqXHR.setRequestHeader('expiry', session.get('auth_info.expiry'));

      var success = requestOptions.success;
      requestOptions.success = function(data, textStatus, jqXHR_resp){
        var access_token = jqXHR_resp.getResponseHeader('Access-Token');
        if (access_token !== undefined){
          session.set('auth_info.access_token', access_token);
        }
        var client = jqXHR_resp.getResponseHeader('Client');
        if (client !== undefined){
          session.set('auth_info.client', client);
        }
        var expiry = jqXHR_resp.getResponseHeader('Expiry');
        if (expiry !== undefined){
          session.set('auth_info.expiry', expiry);
        }
        if (success !== undefined){
          success(data, textStatus, jqXHR_resp);
        }
      };
    }
  }
});

var auth = Ember.Object.extend({
  authorized: Ember.computed(function(){
    return this.get('session.isAuthenticated');
  }),
  current_user: null,

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

  createUser: function(params){
    // var self = this;
    params.confirm_success_url = 'http://localhost:4200/activate';
    return Ember.$.ajax({
      url: config.authHost + '/auth/',
      type: 'POST',
      data: params
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
    app.register('authenticator:custom', CustomAuthenticator);
    app.register('authorizer:custom', CustomAuthorizer);
    app.register('auth:main', auth, {singleton: true});
    app.inject('auth:main', 'session', 'simple-auth-session:main');
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};
