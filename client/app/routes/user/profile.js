import Ember from 'ember';
import Profile from 'commons/models/profile';

export default Ember.Route.extend({
  model: function(){
    var store = this.store;
    return store.find('user', {uid: this.get('session.user.uid')}).then(function(users){
      var user = users.get('firstObject');
      return Profile.create({user: user, store: store}).get('sections');
    });
  },

  setupController: function(controller, model){
    controller.set('model', model);
    controller.set('changes', []);
    controller.set('field_components', []);
  }
});