import Ember from 'ember';

export default Ember.Controller.extend({
  dom_id: function(){
    return 'section-' + this.get('model.section.id');
  }.property(),
  dom_href: function(){
    return '#section-' + this.get('model.section.id');
  }.property()
});
