import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs: function(){
    this.set('input_value', this.get('value'));
  },

  actions: {
    onTextEdit: function(){
      this.sendAction("action", this.get('input_value'));
    }
  }
});
