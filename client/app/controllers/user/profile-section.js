import Ember from 'ember';

export default Ember.Controller.extend({
  dom_id: Ember.computed(function(){
    return 'section-' + this.get('model.section.id');
  }),
  dom_href: Ember.computed(function(){
    return '#section-' + this.get('model.section.id');
  })
});
