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
        title: info[this.get('title_key')],
        data: info[this.get('tab_data_key')],
        dom_id: `${prefix}-${idx + 1}`,
        dom_href: `#${prefix}-${idx + 1}`
      };
    });
  })
});
