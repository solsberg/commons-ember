import Ember from 'ember';

export default Ember.Object.extend({
  findByUsername: function(userName){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve/*, reject*/){
      self.store.find('user').then(function(users){
        resolve(users.find(function(item){
          return item.get('username') === userName;
        }));
      });
    });
  },

  findByUid: function(uid){
    var self = this;
    return new Ember.RSVP.Promise(function(resolve/*, reject*/){
      self.store.find('user').then(function(users){
        resolve(users.find(function(item){
          return item.get('uid') === uid;
        }));
      });
    });
  }
});
