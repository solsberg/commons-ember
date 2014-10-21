import Ember from 'ember';

export default Ember.Object.extend({
  serverTimeOffset: 0,

  init: function(){
    var self = this;
    var offsetRef = new window.Firebase("https://jmr-commons.firebaseio.com/.info/serverTimeOffset");
    offsetRef.on("value", function(snap) {
      var offset = snap.val();
      self.set('serverTimeOffset', offset);
    });
  },

  postItem: function(content, user){
    var timestamp = new Date();
    timestamp.setTime(timestamp.getTime() + this.get('serverTimeOffset'));
    var new_post = this.store.createRecord('newsitem', {
      content: content,
      user: user, //.get('uid'),
      timestamp: timestamp//window.Firebase.ServerValue.TIMESTAMP
    });
    return new_post.save();
  }
});