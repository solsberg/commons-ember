import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel: function() {
    var lockOptions = {
      closable: false,
      authParams: {scope: 'openid'}
    };
    this.get('session').authenticate('authenticator:lock', lockOptions);
  }

});
