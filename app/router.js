import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CommonsENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('profile');
  this.route('about');
  this.route('news');
});

export default Router;
