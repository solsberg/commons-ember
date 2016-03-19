import Ember from 'ember';
import Base from 'auth0-ember-simple-auth/authenticators/lock';
import config from '../config/environment';

export default Base.extend({
  afterAuth: function(data){
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: config.authHost + '/auth/sign_in',
        data: data.profile,
        headers: {'Authorization': data.jwt}
      }).then(function(response){
        data.model = response.user;
        resolve(data);
      }, function(xhr) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  }
});