import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('profile-question', 'ProfileQuestion', {
  // Specify the other units that are required for this test.
  needs: ['model:profile-section']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
