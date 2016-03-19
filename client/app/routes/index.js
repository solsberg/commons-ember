import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  afterModel: function(model){
    var session = this.get('session');
    if (session.get('isRegistered') || 
        (!!model && !!model.fullname && model.fullname !== '')) {
      session.set('isRegistered', true);
      this.transitionTo('about');
    } else {
      session.set('isRegistered', false);
      this.transitionTo('register');
    }
  }
});