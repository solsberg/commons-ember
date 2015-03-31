import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onTextEdit: function(){
      this.sendAction("action", this.get('value'));
    }
  }
});
