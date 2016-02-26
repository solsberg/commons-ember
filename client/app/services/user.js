import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  createUser: function(params){
    // var self = this;
    params.confirm_success_url = 'http://localhost:4200/activate';
    return Ember.$.ajax({
      url: config.authHost + '/auth/',
      type: 'POST',
      data: params
    });
  },

  // deleteUser: function(email, password){
  //   this.authClient.removeUser(email, password);
  // },
  
  findByUsername: function(userName){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve/*, reject*/){
      Ember.$(document).trigger('ajaxSend');
      self.get('store').find('user').then(function(users){
        Ember.$(document).trigger('ajaxComplete');
        resolve(users.find(function(item){
          return item.get('username') === userName;
        }));
      });
    });
  },

  findByUid: function(uid){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve/*, reject*/){
      self.get('store').find('user').then(function(users){
        resolve(users.find(function(item){
          return item.get('uid') === uid;
        }));
      });
    });
  }
});
