import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  isCurrentUser: Ember.computed('model.user', function(){
    return this.get('model.user.uid') === this.get('session.data').authenticated.profile.user_id;
  }),

  showingTransitionModal: false,
  previousTransition: undefined,

  showTransitionModal: function(transition){
   this.set('showingTransitionModal', true);
   this.set('previousTransition', transition);
  },

  actions: {
    formEditingDidComplete: function(){
      if (this.get('showingTransitionModal') && this.get('previousTransition') !== undefined){
        this.get('previousTransition').retry();
      }
    }
  },

  reset: function(){
    this.set('showingTransitionModal', false);
    this.set('previousTransition', undefined);
  }
});
