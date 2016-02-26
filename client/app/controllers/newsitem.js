import Ember from 'ember';
import {makeUrl} from '../utils/gravatar';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  text: Ember.computed('content', function(){
    return this.get('model.content');
  }),

  timeSincePosted: Ember.computed('timestamp', function(){
    return moment(this.get('model.timestamp')).fromNow();
  }),

  profileImageUrl: Ember.computed('user.email', function(){
    return makeUrl(this.get('model.user.email'));
  })
});