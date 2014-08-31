import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if (!this.get('auth').get('authorized')){
      this.transitionTo('login');
    }
    else{
      this.transitionTo('about')
    }
  }
});