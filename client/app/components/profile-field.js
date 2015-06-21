import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group', 'profile-field'],
  classNameBindings: ['edited'],
  
  dom_id: Ember.computed(function(){
    return 'question-' + this.get('question.id');
  }),

  help_id: Ember.computed(function(){
    return 'question-help_' + this.get('question.id');
  }),

  has_help: Ember.computed('question.description', function(){
    return this.get('question.description') !== undefined && this.get('question.description') !== '';
  }),

  edited: Ember.computed('response.isDirty', 'response.text', function(){
    var response = this.get('response');
    return response !== undefined && response.get('isDirty') && !(response.get('isNew') && response.get('text') === '');
  }),

  entry_type: Ember.computed(function(){
    var type = this.get('question.type');
    if (type === "tel"){
      type = "text";
    }
    return `profile-${type}-entry`;
  }),

  actions: {
    onEdited: function(new_value){
      this.sendAction('action', this.get('question'), new_value);
    }
  }
});
