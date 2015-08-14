import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import Ember from 'ember';

moduleForComponent('user-avatar', 'Unit | Component | user avatar', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  integration: true,

  // setup: function () {
  //   this.registry.register('service:-routing', Ember.Object.extend({
  //     availableRoutes: function() { return ['index']; },
  //     hasRoute: function(name) { return name === 'index'; },
  //     isActiveForRoute: function() { return true; },
  //     generateURL: function() { return "/"; }
  //   }));
  // }
});

test('it renders', function(assert) {
  this.set('user', {
    email: "user@example.com",
    profile: {}
  });
  this.render(hbs`{{user-avatar user=this.user}}`);

  assert.equal(this.$('a').length, 1);
});

test('it contains a gravatar image', function(assert) {
  this.set('user', {
    email: "user@example.com",
    profile: {}
  });
  this.render(hbs`{{user-avatar user=this.user}}`);

  assert.ok(this.$('a img').attr("src").match(/gravatar\.com/i));
});

// test('it links to user profile', function(assert) {
//   this.set('user', {
//     email: "user@example.com",
//     username: 'thisuser',
//     profile: {}
//   });
//   this.render(hbs`{{user-avatar user=this.user}}`);
//   console.log("***" + this.$('a').parent()ph.html() + "???");
//   assert.ok(this.$('a').attr("href").match(/\/members\/thisuser\/profile/i));
// });
