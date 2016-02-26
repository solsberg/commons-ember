import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
  authenticate: function(identification, password) {
    // var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: config.authHost + '/auth/sign_in',
        data: {email: identification, password: password}
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
