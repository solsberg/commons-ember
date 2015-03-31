import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],
  
  didInsertElement: function(){
    var response = this.get('response');
    if (response !== undefined) {
      this.set('current_value', response);
    }
    this.saveCurrentValue();
  },

  dom_id: function(){
    return 'question-' + this.get('question.id');
  }.property(),

  help_id: function(){
    return 'question-help_' + this.get('question.id');
  }.property(),

  has_help: function(){
    return this.get('question.description') !== undefined && this.get('question.description') !== '';
  }.property('question.description'),

  current_value: '',
  prev_value: '',

  entry_type: function(){
    var type = this.get('question.type');
    if (type === "tel"){
      type = "text";
    }
    return `profile-${type}-entry`;
  }.property(),

  saveCurrentValue: function(){
    this.set('prev_value', this.get('current_value'));
  },

  actions: {
    onEdited: function(new_value){
      if (this.get('prev_value') !== new_value){
        this.sendAction('action', this.get('question'), new_value);
        this.saveCurrentValue();
      }
    }
  }
});
