import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model: function(){
    var user_id = this.get('session.data').authenticated.profile.user_id;
    return this.store.query('user', {uid: user_id})
      .then(users => users.findBy('uid', user_id));
  },

  afterModel: function(model, transition){
    if (!!model && !!model.fullname && model.fullname !== ''){
      this.get('session').set('isRegistered', true);
      this.transitionTo('about');
    }

    this._super(transition);
  }
});
