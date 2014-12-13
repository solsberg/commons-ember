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
    logout();
    Ember.$.ajax({
      type: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      data: {email: testUser.email, password: testUser.password}
    }).then(function(response, statusText, xhr){
      statusText = statusText;
      return Ember.$.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/auth',
        beforeSend: function(xhr2){
          xhr2.setRequestHeader('uid', response.data.uid);
          xhr2.setRequestHeader('access_token', xhr.getResponseHeader('Access-Token'));
          xhr2.setRequestHeader('token_type', 'Bearer');
          xhr2.setRequestHeader('client', xhr.getResponseHeader('Client'));
          xhr2.setRequestHeader('expiry', xhr.getResponseHeader('Expiry'));
        }
      });
    });
  },

  teardown: function(){
    Ember.run(this.App, this.App.destroy);
  }
});

test('successfully register a new user', function(){
  expect(3);
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

  andThen(function(){
    var notice = find('.notice-content');
    // ok(notice);
    ok(notice.text().indexOf('look for a confirmation email') >= 0);
  });

  // visit('/');
  // click('a.profile');

  // andThen(function(){
  //   var fullname_field = find(".fullname-field");
  //   ok(fullname_field);
  //   equal(fullname_field.text(), testUser.fullname);
  // });
});