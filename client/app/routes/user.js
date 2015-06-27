import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.query('user', {username: params.user_id}).then(function(users){
      return users.findBy('username', params.user_id);
    });
  },

  serialize: function(model){
    return {user_id: model.get('username')};
  }
});