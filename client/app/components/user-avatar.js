import Ember from 'ember';
import {makeUrl} from '../services/gravatar';

export default Ember.Component.extend({
  profileImageUrl: Ember.computed('user.email', function(){
    return makeUrl(this.get('user.email'));
  })
});
