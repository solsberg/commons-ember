import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

module('Integration-Authentication', {
  setup: function(){
    this.App = startApp();
  },

  teardown: function(){
    var container = this.App.__container__;
    var auth = container.lookup('auth:main');
    auth.logout();
    Ember.run(this.App, this.App.destroy);
  }
});

test('successfully signing in', function(){
  expect(2);
  visit('/');
  andThen(function(){
    equal(currentRouteName(), 'login');
  });

  andThen(function(){
    fillIn('input.email-field', 'testuser');
    fillIn('input.password-field', 'password');
    click('button.signin');
  });

  andThen(function(){
    equal(currentRouteName(), 'about');
  });
});