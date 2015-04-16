import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['role'],
  role: 'tabpanel',

  tab_infos: function(){
    var data = this.get('data'),
        prefix = this.get('prefix');
    return this.get('titles').map(function(title, idx){
      return {
        title: title,
        data: data[idx],
        dom_id: `${prefix}-${idx + 1}`,
        dom_href: `#${prefix}-${idx + 1}`
      };
    });
  }.property()
});
