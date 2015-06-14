import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
  text: Ember.computed('item.content', function(){
    return this.get('item.content');
  }),

  timeSincePosted: Ember.computed('item.timestamp', function(){
    var ts = this.get('item.timestamp');
    return ts ? moment(ts).fromNow() : '';
  })
});
