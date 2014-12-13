import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password',
  fullname: 'Test User'
};

module('Integration-Authentication', {
  setup: function(){
    this.App = startApp();
    logout();
    Ember.$.ajax({
      url: 'http://localhost:3000/auth/',
      type: 'POST',
      data: {
        email: testUser.email,
        password: testUser.password,
        password_confirmation: testUser.password,
        username: testUser.username,
        fullname: testUser.fullname,
        confirm_success_url: 'http://localhost:4200/activate'
      }
    });
  },

  teardown: function(){
    var container = this.App.__container__;
    var session = container.lookup('simple-auth-session:main');
    var app = this.App;
    Ember.$.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/auth',
      beforeSend: function(jqXHR){
        jqXHR.setRequestHeader('uid', session.get('user.uid'));
        jqXHR.setRequestHeader('access_token', session.get('auth_info.access_token'));
        jqXHR.setRequestHeader('token_type', 'Bearer');
        jqXHR.setRequestHeader('client', session.get('auth_info.client'));
        jqXHR.setRequestHeader('expiry', session.get('auth_info.expiry'));
      }
    });
    Ember.run(app, app.destroy);
  }
});

test('successfully signing in', function(){
  expect(2);
  visit('/');
  andThen(function(){
    equal(currentRouteName(), 'login');
  });

  andThen(function(){
    fillIn('input.username-field', testUser.email);
    fillIn('input.password-field', testUser.password);
    click('button.signin');
  });

  andThen(function(){
    equal(currentRouteName(), 'about');
  });
});