import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  didRender: function(){
    this._super(...arguments);
    var lockOptions = {
      closable: false,
      container: 'login-pane',
      authParams: {scope: 'openid'}
    };
    this.get('session').authenticate('authenticator:lock', lockOptions);
  }
});
