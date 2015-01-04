import Ember from 'ember';

export default Ember.ObjectController.extend({
  init: function(){
    var response = this.get('response');
    if (response !== undefined)
      this.set('current_text', response.get('text'));
  },

  dom_id: function(){
    return 'question-' + this.get('question.id');
  }.property(),

  current_text: ''
});
