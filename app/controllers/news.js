import Ember from 'ember';

export default Ember.Controller.extend({
  content: '',

  actions: {
    create: function(){
      if (this.get('content').length === 0){
        return;
      }

      var new_post = this.store.createRecord('newsitem', {
        content: this.get('content'),
        user: this.auth.get('current_user').get('uid')
      });
      new_post.save();
    }
  }
});
