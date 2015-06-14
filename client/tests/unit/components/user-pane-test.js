import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('user-pane', 'Unit | Component | user pane', {
  // Specify the other units that are required for this test
  needs: ['component:user-avatar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
