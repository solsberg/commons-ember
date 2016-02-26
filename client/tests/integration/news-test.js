import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import moment from 'npm:moment';

var application;

var user = {
  id: 101,
  uid: 'user',
  email: 'user@example.com',
  username: 'a_user',
  fullname: 'Charlie User'
};

module('Integration-News', {
  setup: function(){
    application = startApp();
    fakeLogin(user);
  },

  teardown: function(){
    fakeLogout();
    andThen(function(){
      Ember.run(application, 'destroy');
    });
  }
});

test('navigate to the news & needs page', function(assert){
  assert.expect(1);
  visit('/');
  andThen(function(){
    click('a.news');
  });
  andThen(function(){
    assert.equal(currentRouteName(), 'news');
  });
});

test('displays news item content', function(assert){
  var newsitem = server.create('newsitem', {content: 'Sunset over Hyrule'});

  assert.expect(1);
  visit('/news');
  andThen(function(){
    var items = find('.newsitem-text');
    assert.equal(items.first().text(), newsitem.content);
  });
});

test('adds a new post to top of feed', function(assert){
  server.create('newsitem', {
    content: "An item of news",
    timestamp: moment().subtract(1, 'h')
  });
  server.create('newsitem', {
    content: "Some more news",
    timestamp: moment().subtract(2, 'h')
  });

  assert.expect(2);
  const new_content = "This is a new post";
  visit('/news');
  fillIn('.new-post', new_content);
  click('.add-post');

  andThen(function(){
    var items = find('.newsitem-text');
    assert.equal(items.length, 3);
    assert.equal(items.first().text(), new_content);
  });
});
