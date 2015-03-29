import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],
  
  didInsertElement: function(){
    var response = this.get('response');
    if (response !== undefined) {
      this.set('current_text', response);
      if (this.get('is_date')) {
        this.set('prev_date', response);
        this.set('current_date', response);
      }
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

  is_text_area: function() {
    return this.get('question.type') === 'textarea';
  }.property('type'),

  is_date: function() {
    return this.get('question.type') === 'date';
  }.property('type'),

  current_text: '',
  prev_text: '',
  current_date: null,
  prev_date: null,

  saveCurrentValue: function(){
    this.set('prev_text', this.get('current_text'));
    this.set('prev_date', this.get('current_date'));
  },

  dateChanged: function(){
    if (this.get('prev_date') !== this.get('current_date')){
      var date = this.get('current_date');
      console.log('date edited');
      this.sendAction('action', this.get('question'), !date ? '' : date);//.toUTCString());
      this.saveCurrentValue();
    }
  }.observes('current_date'),

  actions: {
    onTextEdit: function(){
      if (this.get('prev_text') !== this.get('current_text')){
        console.log('text edited');
        this.sendAction('action', this.get('question'), this.get('current_text'));
        this.saveCurrentValue();
      }
    }
  }
});
