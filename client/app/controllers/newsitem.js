import Ember from 'ember';
import {makeUrl} from '../services/gravatar';
import moment from 'npm:moment';

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