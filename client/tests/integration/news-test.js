import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var server;

var user = {
  id: 101,
  uid: 'user',
  email: 'user@example.com',
  username: 'a_user',
  fullname: 'Charlie User'
};

var newsitems = [
  {
    id: 1,
    content: "An item of news",
    timestamp: moment().subtract(1, 'h')
  },
  {
    id: 2,
    content: "Some more news",
    timestamp: moment().subtract(2, 'h')
  }
];

var new_newsitem = {
  id: 3,
  content: 'This is a new post',
  timestamp: moment()
};

module('Integration-News', {
  setup: function(){
    this.App = startApp();
    fakeLogin(user);

    server = new Pretender(function(){
      this.get('/newsitems', function(request){
        return [200, {"Content-Type": "application/json"}, 
          JSON.stringify({newsitems: newsitems})];
      });

      this.post('/newsitems', function(request){
        return [200, {"Content-Type": "application/json"},
          JSON.stringify({newsitem: new_newsitem})];
      });

      this.get('/users/', function(request){
        return [200, {"Content-Type": "application/json"}, 
          JSON.stringify({users: [user]})];
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

test('posts a new item', function(){
  expect(2);
  visit('/news');
  fillIn('.new-post', new_newsitem.content);
  click('.add-post');

  andThen(function(){
    var items = find('.newsitem-text');
    equal(items.length, newsitems.length + 1);
    equal(items.first().text(), new_newsitem.content);
  });
});
