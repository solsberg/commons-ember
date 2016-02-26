import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  postItem: function(content, user){
    var new_post = this.get('store').createRecord('newsitem', {
      content: content,
      user: user
    });
    return new_post.save();
  }
});