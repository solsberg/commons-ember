import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration-Authentication', {
  setup: function(){
    App = startApp();
    var container = App.__container__;
    var auth = container.lookup('auth:main');
    auth.logout();
  },

  teardown: function(){
    Ember.run(App, App.destroy);
  }
});

test('successfully signing in', function(){
  expect(2);
  visit('/');
  andThen(function(){
    equal(currentRouteName(), 'login');
  });

  andThen(function(){
    fillIn('input.email-field', 'solsberg');
    fillIn('input.password-field', 'arsenal');
    click('button.signin');
  });

  andThen(function(){
    equal(currentRouteName(), 'about');
  });
});