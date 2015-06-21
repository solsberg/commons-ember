import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'commons/tests/helpers/start-app';

var application;

var user = {
  id: 101,
  uid: 'user',
  email: 'user@example.com',
  username: 'a_user',
  fullname: 'Charlie User'
};

module('Acceptance | profile/editing', {
  beforeEach: function() {
    application = startApp();
    fakeLogin(user);
    server.create('user', user);
  },

  afterEach: function() {
    fakeLogout();
    andThen(() => Ember.run(application, 'destroy'));
  }
});

test('editing a value', function(assert) {
  assert.expect(4);

  visit(`/members/${user.username}/profile`);
  var field;

  server.post('/profile_responses', function(db, request) {
    var attrs = JSON.parse(request.requestBody);
    var profile_response = db.profile_responses.insert(attrs.profile_response);
    assert.equal(profile_response.text, 'a new response', 'response saved to server');
    return {profile_response: profile_response};
  });

  andThen(function() {
    field = find('.profile-field').eq(0);
    assert.ok(!field.hasClass('edited'), 'field initially displays as not edited');
    fillIn(field.find('input'), 'a new response');
    triggerEvent(field.find('input'), "blur");
  });

  andThen(function() {
    assert.ok(field.hasClass('edited'), 'field displays as edited after entering text');
    click('.save-changes');
  });

  andThen(function() {
    assert.ok(!field.hasClass('edited'), 'field displays as not edited after saving');
  });
});

test('displaying alert for unsaved changes', function(assert) {
  assert.expect(6);

  visit(`/members/${user.username}/profile`);
  var field;

  andThen(function() {
    field = find('.profile-field').eq(0);
    fillIn(field.find('input'), 'a new response');
    triggerEvent(field.find('input'), "blur");
  });

  andThen(function() {
    var alert = find("#profile-changes-dialog");
    assert.equal(alert.length, 0, 'profile changes dialog should not be displayed');
    click('.navbar a.about');
  });

  andThen(function() {
    var alert = find("#profile-changes-dialog");
    assert.equal(alert.length, 1, 'profile changes dialog should be displayed');
    click(alert.find('.cancel-changes'));
  });

  andThen(function(){
    visit(`/members/${user.username}/profile`);
  });

  andThen(function(){
    var alert = find("#profile-changes-dialog");
    assert.equal(alert.length, 0, 'profile changes dialog should not be displayed');
    field = find('.profile-field').eq(0);
    assert.equal(field.find('input').val(), '');

    fillIn(field.find('input'), 'a new response');
    triggerEvent(field.find('input'), "blur");
  });

  andThen(function() {
    click('.navbar a.about');
  });

  andThen(function() {
    var alert = find("#profile-changes-dialog");
    assert.equal(alert.length, 1, 'profile changes dialog should be displayed');
    click(alert.find('.save-changes'));
  });

  andThen(function(){
    visit(`/members/${user.username}/profile`);
  });

  andThen(function(){
    field = find('.profile-field').eq(0);
    assert.equal(field.find('input').val(), 'a new response');
  });
});
