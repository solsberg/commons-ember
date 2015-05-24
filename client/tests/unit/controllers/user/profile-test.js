import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:user/profile', 'ProfileController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject();

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
      {
        question: Ember.Object.create({
          text: "A question",
          section: sections[0]
        })
      },
      {
        question: Ember.Object.create({
          text: "Another question",
          section: sections[1]
        })
      }
    ];

    controller.set('model', { sections, fields });
  }
});

test('it knows the section titles', function(assert){
  let controller = this.subject();
  let section_titles = controller.get('section_titles');
  assert.deepEqual(section_titles, ["Section 1", "Another Section"]);
});

test('it lists the questions by section', function(assert){
  let controller = this.subject();
  let section_data = controller.get('section_data');
  assert.equal(section_data[0][0].question.get('text'), "A question");
  assert.equal(section_data[1][0].question.get('text'), "Another question");
});
