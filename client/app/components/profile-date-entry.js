import Ember from 'ember';

export default Ember.Component.extend({
  date_value: Ember.computed('value', function(key, value, previousValue){
    if (arguments.length > 1) {
      if (value instanceof Date){
        this.set('value', value.toUTCString());
      }
    }

    var text = this.get('value');
    if (!text || text ===''){
      return null;
    }
    return new Date(text);
  }),

  dateChanged: Ember.observer('value', function(){
    this.sendAction("action", this.get('value'));
  })
});
