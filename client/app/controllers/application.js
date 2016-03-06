import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  current_user: Ember.computed(function(){
    return this.get('session.data').authenticated.profile;
  })
});
