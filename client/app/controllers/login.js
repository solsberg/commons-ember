import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(/*LoginControllerMixin,*/ {
  session: Ember.inject.service(),

  actions: {
    authenticate(){
      var self = this;
      this.get('session').authenticate('authenticator:custom', this.get('identification'), this.get('password'))
        .catch(function(){
          self.set('password', '');
        });
    }
  }
});