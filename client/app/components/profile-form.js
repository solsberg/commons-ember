import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  showingTransitionModal: false,

  actions: {
    editedField: function(question, new_value){
      this.get('profile').updateResponse(question, new_value);
    },

    saveChanges: function(){
      this.get('profile').save();
      this.sendAction('didComplete');
    },

    cancel: function(){
      this.get('profile').cancel();
      this.sendAction('didComplete');
    }
  }
});
