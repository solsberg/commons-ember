import Ember from 'ember';
import {makeUrl} from '../services/gravatar';

export default Ember.ObjectController.extend({
  text: function(){
    return this.get('content.content');
  }.property('content'),

  timeSincePosted: function(){
    return moment(this.get('timestamp')).fromNow();
  }.property('timestamp'),

  profileImageUrl: function(){
    return makeUrl(this.get('user.email'));
  }.property('user.email')
});