import Ember from 'ember';

export default Ember.ArrayController.extend({
  new_content: '',

  itemController: 'newsitem',
  sortProperties: ['timestamp'],
  sortAscending: false,

  actions: {
    create: function(){
      var content = this.get('new_content');
      if (content.length === 0){
        return;
      }

      var self = this;
      this.newsItemService.postItem(content, this.auth.get('current_user')).then(function(new_post){
        self.get('model').addObject(new_post);
        self.set('new_content', '');
      });
    }
  }
});
