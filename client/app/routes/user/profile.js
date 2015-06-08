import Ember from 'ember';
import Profile from 'commons/models/profile';

export default Ember.Route.extend({
  model: function(){
    var store = this.store;
    return store.find('user', {uid: this.get('session.user.uid')}).then(function(users){
      var user = users.get('firstObject');
      return Profile.create({user: user, store: store}).fetch();
    });
  },

  setupController: function(controller, model){
    controller.set('model', model);
    controller.reset();
  },

  actions: {
    willTransition: function(transition){
      if (this.controller.hasPendingChanges()){
        transition.abort();
        this.controller.showTransitionModal(transition);
      }
    }
  }
});
