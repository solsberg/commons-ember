import Ember from 'ember';
import Profile from 'commons/models/profile';

export default Ember.Route.extend({
  model: function(){
    var store = this.store;
    var user = this.modelFor('user');// users.get('firstObject');
    return Profile.create({user: user, store: store}).fetch();
  },

  setupController: function(controller, model){
    controller.set('model', model);
    controller.reset();
  },

  actions: {
    willTransition: function(transition){
      if (this.controller.get('model').hasPendingChanges()){
        transition.abort();
        this.controller.showTransitionModal(transition);
      }
    }
  }
});
