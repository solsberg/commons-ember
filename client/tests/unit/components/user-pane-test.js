import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('user-pane', 'Unit | Component | user pane', {
  // Specify the other units that are required for this test
  needs: ['component:user-avatar'],
  unit: true,

  setup: function () {
    this.registry.register('service:-routing', Ember.Object.extend({
      availableRoutes: function() { return ['index']; },
      hasRoute: function(name) { return name === 'index'; },
      isActiveForRoute: function() { return true; },
      generateURL: function() { return "/"; }
    }));
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  component.set('user', {email: "user@example.com", fullname: "A User"});

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
