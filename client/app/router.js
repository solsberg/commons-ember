import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('activate');
  this.route('notice');
  this.route('about');
  this.route('news');
  this.route('users', {path: '/members', resetNamespace: true}, function(){
    this.route('user', {path: '/:user_id', resetNamespace: true}, function(){
      this.route('profile');
    });
  });
});

export default Router;
