import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function(){
    Ember.$('#myTab a:first').tab('show');
  },

  attributeBindings: ['role'],
  role: 'tabpanel',

  tab_infos: Ember.computed(function(){
    var data = this.get('data'),
        prefix = this.get('prefix');
    return data.map((info, idx) => {
      return {
        data: info,
        title: info[this.get('title_key')],
        dom_id: `${prefix}-${idx + 1}`
      };
    });
  })
});
