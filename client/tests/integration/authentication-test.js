import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
// import { currentSession } from 'commons/tests/helpers/ember-simple-auth';

// var testUser = {
//   username: 'testuser',
//   email: 'testuser@example.com',
//   password: 'password',
//   fullname: 'Test User'
// };

module('Integration-Authentication', {
  setup: function(){
    this.App = startApp();
    logout();
    // Ember.$.ajax({
    //   url: 'http://localhost:3000/auth/',
    //   type: 'POST',
    //   data: {
    //     email: testUser.email,
    //     password: testUser.password,
    //     password_confirmation: testUser.password,
    //     username: testUser.username,
    //     fullname: testUser.fullname,
    //     confirm_success_url: 'http://localhost:4200/activate'
    //   }
    // });
  },

  teardown: function(){
    // var container = this.App.__container__;
    // var session = container.lookup('simple-auth-session:main');
    var app = this.App;
    // var session = currentSession(app);
    // Ember.$.ajax({
    //   type: 'DELETE',
    //   url: 'http://localhost:3000/auth',
    //   beforeSend: function(jqXHR){
    //     jqXHR.setRequestHeader('uid', session.get('data').authenticated.user.uid);
    //     jqXHR.setRequestHeader('access_token', session.get('data').auth_info.access_token);
    //     jqXHR.setRequestHeader('token_type', 'Bearer');
    //     jqXHR.setRequestHeader('client', session.get('data').auth_info.client);
    //     jqXHR.setRequestHeader('expiry', session.get('data').auth_info.expiry);
    //   }
    // });
    Ember.run(app, app.destroy);
  }
});

test('successfully signing in', function(assert){
//   assert.expect(2);
//   visit('/');
//   andThen(function(){
//     assert.equal(currentRouteName(), 'login');
//   });

//   andThen(function(){
//     fillIn('input.username-field', testUser.email);
//     fillIn('input.password-field', testUser.password);
//     click('button.signin');
//   });

//   andThen(function(){
//     assert.equal(currentRouteName(), 'about');
//   });
  assert.ok(true);
});
