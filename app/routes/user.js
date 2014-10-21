import Ember from 'ember';

export default Ember.Route.extend({
  // model: function(user_id){
  //   console.log(user_id);
  // },

  serialize: function(model){
    return {user_id: model.get('username')};
  }
});