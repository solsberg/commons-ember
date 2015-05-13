import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    //no model required
  },

  serialize: function(model){
    return {user_id: model.get('username')};
  }
});