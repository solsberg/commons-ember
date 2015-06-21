import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'commons/tests/helpers/start-app';

var application;

var signed_in_user = {
  id: 101,
  uid: 'user',
  email: 'user@example.com',
  username: 'a_user',
  fullname: 'Charlie User'
};

var other_user = {
  id: 102,
  uid: 'other_user',
  email: 'other_user@example.com',
  username: 'another_user',
  fullname: 'Another User'
};

module('Acceptance | profile/viewing', {
  beforeEach: function() {
    application = startApp();
    server.create('user', signed_in_user);
    fakeLogin(signed_in_user);
  },

  afterEach: function() {
    fakeLogout();
    andThen(() => Ember.run(application, 'destroy'));
  }
});

test('viewing another members responses', function(assert) {
  assert.expect(1);

  other_user = server.create('user', other_user);
  var response = server.create('profile_response', {
    text: 'his response',
    questionId: 1,
    user_id: other_user.id
  });
  // other_user.profileResponses = [response.id];
  server.db.users.update(other_user.id, {profileResponses: [response.id]});

  visit(`/members/${other_user.username}/profile`);

  andThen(function() {
    var field = find('.profile-field-ro#question-1').eq(0);
    assert.equal(field.find('.response-text').text(), 'his response');
  });
});
