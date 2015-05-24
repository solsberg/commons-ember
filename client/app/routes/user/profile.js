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
    controller.set('changes', []);
    controller.set('field_components', []);
    controller.set('showingTransitionModal', false);
    controller.set('previousTransition', undefined);
  },

  actions: {
    willTransition: function(transition){
      if (this.controller.get('changes').length > 0){
        transition.abort();
        this.controller.showTransitionModal(transition);
      }
    }
  }
});
