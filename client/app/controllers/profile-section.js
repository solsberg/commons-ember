import Ember from 'ember';

export default Ember.ObjectController.extend({
  dom_id: function(){
    return 'section-' + this.get('section.id');
  }.property(),
  dom_href: function(){
    return '#section-' + this.get('section.id');
  }.property(),

  fields: Ember.computed.contentController('profile-fields', 'content.fields'),

  saveChanges: function(){
    this.get('fields').forEach(function(item){
      item.saveChanges();
    });
  }
});
