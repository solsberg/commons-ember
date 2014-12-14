import Ember from 'ember';

export default Ember.Object.extend({
  postItem: function(content, user){
    var new_post = this.store.createRecord('newsitem', {
      content: content,
      user: user
    });
    return new_post.save();
  }
});