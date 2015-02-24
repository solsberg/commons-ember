import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function(){
    var store = this.store;
    return store.find('user', {uid: this.get('session.user.uid')}).then(function(users){
      var user = users.get('firstObject');
      return {user : user};
    });
  }
});