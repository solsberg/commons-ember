import Ember from 'ember';
import {
  moduleForModel,
  test
} from 'ember-qunit';
import Profile from 'commons/models/profile';

moduleForModel('profile', 'Profile', {
  // Specify the other units that are required for this test.
  // needs: ['model:profile-section']

  setup: function(){
    this.user = Ember.Object.create({
      uid: 'user',
      profileResponses: [Ember.Object.create(
        {
          text: "a response",
          questionId: 1
        })
      ]
    });
    var sections = [
      Ember.Object.create({
        id: 1,
        title: "Section 1"
      }),
      Ember.Object.create({
        id: 2,
        title: "Another Section"
      })
    ];
    var questions = [
      Ember.Object.create({
        id: 1,
        text: "A question",
        section: sections[0]
      }),
      Ember.Object.create({
        id: 2,
        text: "Another question",
        section: sections[1]
      })
    ];
    this.questions = questions;

    var store = {};

    store.findAll = sinon.stub();
    store.findAll.withArgs('profile-section').returns(Ember.RSVP.resolve(sections));
    store.findAll.withArgs('profile-question').returns(Ember.RSVP.resolve(questions));

    this.model = Profile.create({user: this.user, store});
    Ember.run(() => {
      this.model.fetch();
    });

    this.fields = this.model.get('fields');

    this.save_log = console.log;
    console.log = sinon.stub();
  },

  teardown: function(){
    console.log = this.save_log;
  }
});

test('it calculates all the fields', function(assert) {
  assert.expect(4);

  assert.equal(this.fields.length, 2);
  assert.equal(this.model.get('sections.length'), 2);

  var field = this.fields.findBy('question.id', 1);
  assert.ok(field.get('response'));
  field = this.fields.findBy('question.id', 2);
  assert.ok(!field.get('response'));
});

test('it updates the response record when user modifies a previously answered question', function(assert){
  assert.expect(1);

  this.model.updateResponse(this.questions[0], 'new response');

  assert.equal(this.fields[0].response.get('text'), "new response");
});

test('it creates a new response record when user responds to a previously unanswered question', function(assert){
  assert.expect(3);

  let response = Ember.Object.create();

  let store = this.model.get('store');
  store.createRecord = sinon.stub();
  store.createRecord.returns(response);

  this.model.updateResponse(this.questions[1], 'my response');

  assert.ok(store.createRecord.calledOnce);
  assert.ok(store.createRecord.calledWith('profile-response', {questionId: 2}));
  assert.equal(this.fields[1].response.get('text'), "my response");
});

test('it saves a modified response', function(assert){
  assert.expect(1);

  let response = this.fields[0].response;
  response.hasDirtyAttributes = true;
  response.save = sinon.stub();

  this.model.save();

  assert.ok(response.save.calledOnce);
});

test('it doesnt save an unmodified response', function(assert){
  assert.expect(1);

  let response = this.fields[0].response;
  response.hasDirtyAttributes = false;
  response.save = sinon.stub();

  this.model.save();

  assert.equal(response.save.callCount, 0);
});

test('it saves a new response', function(assert){
  assert.expect(1);

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.hasDirtyAttributes = true;
  response.isNew = true;
  response.save = sinon.stub();

  this.model.save();

  assert.ok(response.save.calledOnce);
});

test('it doesnt save a new response when the answer has been deleted', function(assert){
  assert.expect(1);

  let response = Ember.Object.create();
  this.fields[1].response = response;
  response.hasDirtyAttributes = true;
  response.isNew = true;
  response.text = '';
  response.save = sinon.stub();

  this.model.save();

  assert.equal(response.save.callCount, 0);
});

test('it assigns a new response to the user before saving', function(assert){
  assert.expect(1);

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.hasDirtyAttributes = true;
  response.isNew = true;
  response.save = sinon.stub();

  this.model.save();

  assert.deepEqual(response.get('user'), this.user);
});

test('it deletes the response record when user has cleared the answer', function(assert){
  assert.expect(3);

  let response = this.fields[0].response;
  response.text = '';
  response.hasDirtyAttributes = true;
  response.save = sinon.stub();

  let store = this.model.get('store');
  store.deleteRecord = sinon.stub();

  this.model.save();

  assert.ok(store.deleteRecord.calledOnce, 'deleteRecord was called');
  assert.ok(response.save.calledOnce, 'save was called');
  assert.ok(!this.fields[0].response, 'field.response was cleared');
});

test('it rolls backs the changes when user cancels', function(assert){
  assert.expect(1);

  let response = this.fields[0].response;
  response.hasDirtyAttributes = true;
  response.rollbackAttributes = sinon.stub();

  this.model.cancel();

  assert.ok(response.rollbackAttributes.calledOnce);
});

test('it clears the text of (and doesnt roll back) a new response', function(assert){
  assert.expect(2);

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.hasDirtyAttributes = true;
  response.isNew = true;
  response.rollbackAttributes = sinon.stub();

  this.model.cancel();

  assert.equal(response.get('text'), '');
  assert.equal(response.rollbackAttributes.callCount, 0);
});

test('it knows if there have been any edits', function(assert){
  assert.expect(1);

  let response = this.fields[0].response;
  response.hasDirtyAttributes = true;

  assert.equal(this.model.hasPendingChanges(), true);
});

test('it knows if there have not been any edits', function(assert){
  assert.expect(1);

  assert.equal(this.model.hasPendingChanges(), false);
});

test('it lists the fields by section', function(assert){
  assert.expect(3);

  let fields_by_section = this.model.get('fields_by_section');
  let section_titles = fields_by_section.map(s => s.title);
  let section_fields = fields_by_section.map(s => s.fields);

  assert.deepEqual(section_titles, ["Section 1", "Another Section"]);

  assert.equal(section_fields[0][0].question.get('text'), "A question");
  assert.equal(section_fields[1][0].question.get('text'), "Another question");
});

