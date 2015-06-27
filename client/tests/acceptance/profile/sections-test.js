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

module('Acceptance | Profile Sections', {
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

test('sections are displayed by tabs', function(assert) {
  assert.expect(2);

  visit(`/members/${user.username}/profile`);

  andThen(function() {
    let tabs = find('.profile-tab');
    assert.equal(tabs.length, 2);

    let first_title = tabs.eq(0).find('.title');
    assert.equal(first_title.text(), 'General Information');
  });
});

test('questions are displayed inside the tabs', function(assert) {
  assert.expect(4);

  visit(`/members/${user.username}/profile`);

  andThen(function() {
    //finds a question from the first section
    var question_on_first_tab = find(".profile-field label:contains(Home Address)");
    assert.ok(question_on_first_tab.is(':visible'));

    //doesn't find a question from the second section
    var question_on_second_tab = find(".profile-field label:contains(What do you do?)");
    assert.ok(question_on_second_tab.is(':hidden'));

    //click on second tab
    click('.profile-tab:eq(1) .title');
    andThen(function(){
      //doesn't find a question from the first section
      assert.ok(question_on_first_tab.is(':hidden'));
      //finds find a question from the second section
      assert.ok(question_on_second_tab.is(':visible'));
    });
  });
});
