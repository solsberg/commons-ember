import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var server;

var user = {
  uid: 'user',
  email: 'user@example.com',
  username: 'a_user',
  fullname: 'Charlie User'
};

var newsitems = [
  {
    id: 1,
    content: "An item of news",
  },
  {
    id: 2,
    content: "Some more news"
  }
];

module('Integration-News', {
  setup: function(){
    this.App = startApp();
    fakeLogin();

    server = new Pretender(function(){
      this.get('/newsitems', function(request){
        return [200, {"Content-Type": "application/json"}, 
          JSON.stringify({newsitems: newsitems})];
      });
    });
  },

  teardown: function(){
    fakeLogout();
    Ember.run(this.App, this.App.destroy);
    server.shutdown();
  }
});

test('navigate to the news & needs page', function(){
  expect(1);
  visit('/');
  click('a.news');
  andThen(function(){
    equal(currentRouteName(), 'news');
  });
});

test('displays news item content', function(){
  expect(1);
  visit('/news');
  andThen(function(){
    var items = find('.newsitem-text');
    equal(items.first().text(), newsitems[0].content);
  });
});

