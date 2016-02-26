import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),

  model: function(){
    var store = this.store;
    var sessionData = this.get('session.data').authenticated;
    return store.query('user', {uid: !!sessionData.user ? sessionData.user.uid : undefined}).then(function(users){
      var user = users.get('firstObject');
      return {user : user};
    });
  },

  actions: {
    logout(){
      this.get('session').invalidate();
    }
  }
});