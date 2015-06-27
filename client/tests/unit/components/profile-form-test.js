import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('profile-form', 'Unit | Component | profile form', {
  // Specify the other units that are required for this test
  needs: ['component:tab-view'],

  setup: function(){
    var component = this.subject();

    this.user = {
      uid: 'user'
    };

    let sections = [
      Ember.Object.create({
        id: 1,
        title: "Section 1"
      }),
      Ember.Object.create({
        id: 2,
        title: "Another Section"
      })
    ];

    let fields = [
      Ember.Object.create({
        question: Ember.Object.create({
          id: 1,
          text: "A question",
          section: sections[0]
        }),
        response: Ember.Object.create({
          text: "previous response"
        })
      }),
      Ember.Object.create({
        question: Ember.Object.create({
          id: 2,
          text: "Another question",
          section: sections[1]
        })
      })
    ];

    let needsSaving = function(response){
      return !!response && response.hasDirtyAttributes &&
        !(response.isNew && response.text.trim() === '');
    };

    component.set('profile', { sections, fields, user: this.user, responseNeedsSaving: needsSaving });
    component.set('didComplete');

    var targetObject = {
      didCompleteAction: function() {
      }
    };
    component.set('didComplete', 'didCompleteAction');
    component.set('targetObject', targetObject);

    this.fields = fields;
  }
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

