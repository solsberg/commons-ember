import Ember from 'ember';

export default Ember.Component.extend({
  dateChanged: function(){
    this.sendAction("action", this.get('value'));
  }.observes('value')
});
