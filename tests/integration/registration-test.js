import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

var testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password',
  fullname: 'Test User'
};

module('Integration-Registration', {
  setup: function(){
    App = startApp();
    var container = App.__container__;
    var auth = container.lookup('auth:main');
    auth.logout();
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
    Ember.run(App, App.destroy);
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