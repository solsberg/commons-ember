import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('profile');
  this.route('about');
  this.route('news');
  this.resource('users', {path: '/members'}, function(){
    this.resource('user', {path: '/:user_id'}, function(){
      this.route('profile');
    });
  });
});

export default Router;
