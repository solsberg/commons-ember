import Ember from 'ember';

export default Ember.ObjectController.extend({
  init: function(){
    var response = this.get('response');
    if (response !== undefined) {
      this.set('current_text', response.get('text'));
      if (this.get('is_date')) {
        this.set('current_date', new Date(this.get('current_text')));
      }
    }
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
  current_date: null,

  isDirty: function() {
    var response = this.get('response');
    if (this.get('is_date')) {
      var date = this.get('current_date');
      return (response === undefined && date ||
        response !== undefined && date.toUTCString() !== response.get('text'));
    }
    var text = this.get('current_text').trim();
    return (response === undefined && text !== '' ||
      response !== undefined && text !== response.get('text'));
  }.property('current_text', 'current_date'),

  saveChanges: function(){
    if (this.get('isDirty')){
      var response = this.get('response');
      var text = this.get('current_text').trim();
      if (this.get('is_date')) {
        var date = this.get('current_date');
        if (!date){
          if (response !== undefined){
            //should always be true
            response.destroyRecord();
          }
          return;
        }

        if (response === undefined){
          response = this.store.createRecord('profile-response', {
            questionId: this.get('question.id'),
            user: this.get('user')
          });
        }
        response.set('text', date.toUTCString());
        response.save();
        return;
      }

      if (text === ''){
        if (response !== undefined){
          //should always be true
          response.destroyRecord();
        }
        return;
      }

      if (response === undefined){
        response = this.store.createRecord('profile-response', {
          questionId: this.get('question.id'),
          user: this.get('user')
        });
      }
      response.set('text', text);
      response.save();
    }
  }
});
