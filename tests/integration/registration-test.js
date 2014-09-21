import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var testUser = {
  username: 'otheruser',
  email: 'otheruser@example.com',
  password: 'password',
  fullname: 'Other User'
};

module('Integration-Registration', {
  setup: function(){
    this.App = startApp();
    var container = this.App.__container__;
    var auth = container.lookup('auth:main');
    this.auth = auth;
    auth.deleteUser(testUser.email, testUser.password);
    var userService = container.lookup('service:user');
    Ember.$(document).trigger('ajaxSend');
    userService.findByUsername(testUser.username).then(function(user){
      Ember.$(document).trigger('ajaxComplete');
      if (user){
        user.destroyRecord();
      }
    });
  },

  teardown: function(){
    this.auth.logout();
    Ember.run(this.App, this.App.destroy);
  }
});

test('successfully register a new user', function(){
  expect(4);
  visit('/');
  andThen(function(){
    equal(currentRouteName(), 'login');
  });

  click('a.register');
  andThen(function(){
    equal(currentRouteName(), 'register');
  });

  fillIn('input.username-field', testUser.username);
  fillIn('input.email-field', testUser.email);
  fillIn('input.password-field', testUser.password);
  fillIn('input.confirm-field', testUser.password);
  fillIn('input.fullname-field', testUser.fullname);
  click('button.register');

  visit('/');
  click('a.profile');

  andThen(function(){
    var fullname_field = find(".fullname-field");
    ok(fullname_field);
    equal(fullname_field.text(), testUser.fullname);
  });
});