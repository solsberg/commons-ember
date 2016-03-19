import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  userService: Ember.inject.service('user'),
  needs: ['notice'],
  noticeController: Ember.inject.controller('notice'),

  actions: {
    register: function(){
      var user = this.get('model');
      user.set('fullname', this.get('fullname'));
      user.save().then(() => {
        this.get('noticeController').set('message', "Your registration for an account on JMR Commons has been accepted. " +
            "Please look for a confirmation email in your inbox and click on the link to activate your account.");
        this.get('session').set('isRegistered', true);
        this.transitionToRoute('notice');
      }, function(error){
        var err = error;
        return err;
      });
    }
  }
});
