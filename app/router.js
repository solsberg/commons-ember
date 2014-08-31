import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CommonsENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('about');
});

export default Router;
