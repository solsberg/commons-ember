import Ember from 'ember';
import {makeUrl} from '../services/gravatar';
import moment from 'npm:moment';

export default Ember.Component.extend({
  // attributeBindings: ['role'],
  // role: 'tabpanel',

  text: Ember.computed('item.content', function(){
    return this.get('item.content');
  }),

  timeSincePosted: Ember.computed('item.timestamp', function(){
    var ts = this.get('item.timestamp');
    return ts ? moment(ts).fromNow() : '';
  }),

  profileImageUrl: Ember.computed('item.user.email', function(){
    return makeUrl(this.get('item.user.email'));
  })
});
