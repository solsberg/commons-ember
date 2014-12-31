import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';
import moment from 'npm:moment';

var newsitem = {
  content: "this is the content",
  timestamp: moment().subtract(150, 'm'),
  user: {email: 'user@example.com'}
};

moduleFor('controller:newsitem', 'NewsitemController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject({auth: Ember.Object.create({})});
    controller.set('model', Ember.Object.create(newsitem));
  }
});

test('it has a text', function() {
  var controller = this.subject();
  equal(controller.get('text'), newsitem.content);
});

test('it displays the time since posted', function() {
  var controller = this.subject();
  equal(controller.get('timeSincePosted'), "3 hours ago");
});

test('it calculates a gravatar image url', function(){
  var controller = this.subject();
  var expected_url = "http://www.gravatar.com/avatar/" + md5(newsitem.user.email.trim().toLowerCase());
  equal(controller.get('profileImageUrl'), expected_url);
  
});
