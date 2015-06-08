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
    this.store = application.__container__.lookup('store:main');
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
  var store = this.store;

  visit(`/members/${user.uid}/profile`);
  var field;

  andThen(function() {
    field = find('.profile-field').eq(0);
    assert.ok(!field.hasClass('edited'));
    fillIn(field.find('input'), 'a new response');
    triggerEvent(field.find('input'), "blur");
  });

  andThen(function() {
    assert.ok(field.hasClass('edited'));
    click('.save-changes');
  });

  andThen(function() {
    assert.ok(!field.hasClass('edited'));
    // visit('/about');

    var responses = server.db.profile_responses.where({text: 'a new response'});
    assert.equal(responses.length, 1);
  });

  // andThen(function() {
  //   store.unloadAll('user');
  //   store.unloadAll('profile-response');
  //   var route = application.__container__.lookup('route:user/profile');
  //   route.refresh();
  //   // route.render();
  //   visit(`/members/${user.uid}/profile`);
  // });

  // andThen(function() {
  //   var view = application.__container__.lookup('view:user/profile');
  //   Ember.run(function(){  // begin loop
  //     view.rerender();
  //   });
  // });

  // andThen(function(){
  //   field = find('.profile-field').eq(0);
  //   assert.equal(field.find('input').val(), 'a new response');
  // });
});

test('displaying alert for unsaved changes', function(assert) {
  assert.expect(6);
  var store = this.store;

  visit(`/members/${user.uid}/profile`);
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
    visit(`/members/${user.uid}/profile`);
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
    visit(`/members/${user.uid}/profile`);
  });

  andThen(function(){
    field = find('.profile-field').eq(0);
    assert.equal(field.find('input').val(), 'a new response');
  });
  // andThen(function() {
  //   store.unloadAll('user');
  //   store.unloadAll('profile-response');
  //   var route = application.__container__.lookup('route:user/profile');
  //   route.refresh();
  //   // route.render();
  //   visit(`/members/${user.uid}/profile`);
  // });

  // andThen(function() {
  //   var view = application.__container__.lookup('view:user/profile');
  //   Ember.run(function(){  // begin loop
  //     view.rerender();
  //   });
  // });

  // andThen(function(){
  //   field = find('.profile-field').eq(0);
  //   assert.equal(field.find('input').val(), 'a new response');
  // });
});
