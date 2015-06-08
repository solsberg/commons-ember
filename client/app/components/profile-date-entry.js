import Ember from 'ember';

export default Ember.Component.extend({
  date_value: Ember.computed('value', {
    get(key){
      var text = this.get('value');
      if (!text || text ===''){
        return null;
      }
      return new Date(text);
    },

    set(key, value){
      if (value instanceof Date){
        this.set('value', value.toUTCString());
      }
      return value;
    }
  }),

  dateChanged: Ember.observer('value', function(){
    this.sendAction("action", this.get('value'));
  })
});
