import Ember from 'ember';
import {makeUrl} from '../services/gravatar';

export default Ember.ObjectController.extend({
  text: function(){
    return this.get('content').get('content');
  }.property('content'),

  timeSincePosted: function(){
    return moment(this.get('timestamp')).fromNow();
  }.property('timestamp'),

  profileImageUrl: function(){
    var user = this.get('user');
    return makeUrl(user.get('email'));
  }.property('user.email')
});