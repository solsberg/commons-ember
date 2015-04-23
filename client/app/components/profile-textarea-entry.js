import TextEntry from './profile-text-entry';

export default TextEntry.extend({
  actions: {
    onTextEdit: function(){
      this.sendAction("action", this.get('value'));
    }
  }
});
