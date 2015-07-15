import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:login', 'LoginController', {
  // Specify the other units that are required for this test.
  setup: function(){
    this.subject({auth: Ember.Object.create({})});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});
