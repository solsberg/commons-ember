import Ember from 'ember';
import {
  moduleForModel,
  test
} from 'ember-qunit';
import Profile from 'commons/models/profile';

// moduleForModel('profile', 'Profile', {
//   // Specify the other units that are required for this test.
//   // needs: ['model:profile-section']
// });

test('it calculates all the fields', function(assert) {
  assert.expect(4);

  var user = Ember.Object.create({
    uid: 'user',
    profileResponses: [
      {
        text: "a response",
        questionId: 1
      }
    ]
  });
  var sections = [
    Ember.Object.create({
      id: 1
    }),
    Ember.Object.create({
      id: 2
    })
  ];
  var questions = [
    Ember.Object.create({
      id: 1,
      section: 1
    }),
    Ember.Object.create({
      id: 2,
      section: 2
    })
  ];

  var store = {};

  store.find = sinon.stub();
  store.find.withArgs('profile-section').returns(Ember.RSVP.resolve(sections));
  store.find.withArgs('profile-question').returns(Ember.RSVP.resolve(questions));

  var model = Profile.create({user, store});
  model.fetch().then(function(data){
    assert.equal(data.fields.length, 2);
    assert.equal(data.sections.length, 2);

    var field = data.fields.findBy('question.id', 1);
    assert.ok(field.get('response'));
    field = data.fields.findBy('question.id', 2);
    assert.ok(!field.get('response'));
  });
});
