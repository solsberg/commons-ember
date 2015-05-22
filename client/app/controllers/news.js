import Ember from 'ember';

export default Ember.Controller.extend({
  new_content: '',

  newsitemsChronRev: ['timestamp:desc'],
  sorted_newsitems: Ember.computed.sort('model', 'newsitemsChronRev'),

  actions: {
    create: function(){
      var content = this.get('new_content');
      if (content.length === 0){
        return;
      }

      var self = this;

      this.store.find('user', {uid: this.get('session.user.uid')}).then(function(users){
        var user = users.get('firstObject');
        var new_item = self.store.createRecord('newsitem', {
          content: content,
          user: user
        });
        new_item.save().then(function(){
          self.set('new_content', '');
        });
      });
    }
  }
});
