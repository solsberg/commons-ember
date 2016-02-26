import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'commons/tests/helpers/start-app';
import { authenticateSession, invalidateSession } from 'commons/tests/helpers/ember-simple-auth';

var application;

var user = {
  id: 101,
  uid: 'me',
  email: 'me@example.com',
  username: 'my_name',
  fullname: 'My Name'
};

module('Acceptance | members list', {
  beforeEach: function() {
    application = startApp();
    server.create('user', user);
    authenticateSession(application, {user: user, auth_info: {}});
  },

  afterEach: function() {
    invalidateSession(application);
    andThen(function(){
      Ember.run(application, 'destroy');
    });
  }
});

test('visiting /members', function(assert) {
  visit('/members');

  andThen(function() {
    assert.equal(currentRouteName(), 'users.index');
  });
});

test('it displays the list of members', function(assert){
  assert.expect(3);
  visit('/members');

  server.createList('user', 2);

  andThen(function(){
    var members = find('.members-list-item');
    assert.equal(members.length, 3);

    //get item for user
    var user_item = find(`.members-list-item:contains(${user.fullname})`);
    assert.equal(user_item.length, 1);

    //links to profile page
    click(`.members-list-item a:contains(${user.fullname})`);
  });

  andThen(function(){
    assert.equal(currentURL(), `/members/${user.username}/profile`);
  });
});
