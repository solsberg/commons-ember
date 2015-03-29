import Ember from 'ember';
import {makeUrl} from '../services/gravatar';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  text: function(){
    return this.get('model.content');
  }.property('content'),

  timeSincePosted: function(){
    return moment(this.get('model.timestamp')).fromNow();
  }.property('timestamp'),

  profileImageUrl: function(){
    return makeUrl(this.get('model.user.email'));
  }.property('user.email')
});