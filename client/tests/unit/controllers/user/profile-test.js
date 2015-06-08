import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:user/profile', 'ProfileController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject();

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

    controller.set('model', { sections, fields, user: this.user });
    this.fields = fields;

    // this.store = {};
    // this.new_record = {};

    // this.new_record.save = sinon.stub();
    // this.new_record.save.returns(Ember.RSVP.resolve());

    // this.store.createRecord = sinon.stub();
    // this.store.createRecord.returns(this.new_record);

    // this.store.find = sinon.stub();
    // this.store.find.returns(Ember.RSVP.resolve([user]));

    // controller.set('store', this.store);

    this.save_log = console.log;
    console.log = sinon.stub();
  },

  teardown: function(){
    console.log = this.save_log;
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

//**************** Editing *****************

test('it updates the response record when user modifies a previously answered question', function(assert){
  assert.expect(1);
  let controller = this.subject();
  controller.send('editedField', this.fields[0].question, "new response");
  assert.equal(this.fields[0].response.get('text'), "new response");
});

test('it creates a new response record when user responds to a previously unanswered question', function(assert){
  assert.expect(3);
  let controller = this.subject();

  let response = Ember.Object.create();
  let store = {};

  store.createRecord = sinon.stub();
  store.createRecord.returns(response);

  controller.set('store', store);

  controller.send('editedField', this.fields[1].question, "my response");

  assert.ok(store.createRecord.calledOnce);
  assert.ok(store.createRecord.calledWith('profile-response', {questionId: 2}));
  assert.equal(this.fields[1].response.get('text'), "my response");
});

test('it saves a modified response', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = this.fields[0].response;
  response.isDirty = true;
  response.save = sinon.stub();

  controller.send('saveChanges');

  assert.ok(response.save.calledOnce);
});

test('it doesnt save an unmodified response', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = this.fields[0].response;
  response.isDirty = false;
  response.save = sinon.stub();

  controller.send('saveChanges');

  assert.equal(response.save.callCount, 0);
});

test('it saves a new response', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.isDirty = true;
  response.isNew = true;
  response.save = sinon.stub();

  controller.send('saveChanges');

  assert.ok(response.save.calledOnce);
});

test('it doesnt save a new response when the answer has been deleted', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = Ember.Object.create();
  this.fields[1].response = response;
  response.isDirty = true;
  response.isNew = true;
  response.text = '';
  response.save = sinon.stub();

  controller.send('saveChanges');

  assert.equal(response.save.callCount, 0);
});

test('it assigns a new response to the user before saving', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.isDirty = true;
  response.isNew = true;
  response.save = sinon.stub();

  controller.send('saveChanges');

  assert.deepEqual(response.get('user'), this.user);
});

test('it deletes the response record when user has cleared the answer', function(assert){
  assert.expect(3);
  let controller = this.subject();

  let response = this.fields[0].response;
  response.text = '';
  response.isDirty = true;
  response.save = sinon.stub();

  let store = {};
  store.deleteRecord = sinon.stub();
  controller.set('store', store);

  controller.send('saveChanges');

  assert.ok(store.deleteRecord.calledOnce, 'deleteRecord was called');
  assert.ok(response.save.calledOnce, 'save was called');
  assert.ok(!this.fields[0].response, 'field.response was cleared');
});

test('it rolls backs the changes when user cancels', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = this.fields[0].response;
  response.isDirty = true;
  response.rollback = sinon.stub();

  controller.send('cancel');

  assert.ok(response.rollback.calledOnce);
});

test('it clears the text of (and doesnt roll back) a new response', function(assert){
  assert.expect(2);

  let controller = this.subject();

  let response = Ember.Object.create({text: 'some response'});
  this.fields[1].response = response;
  response.isDirty = true;
  response.isNew = true;
  response.rollback = sinon.stub();

  controller.send('cancel');

  assert.equal(response.get('text'), '');
  assert.equal(response.rollback.callCount, 0);
});

test('it knows if there have been any edits', function(assert){
  assert.expect(1);

  let controller = this.subject();

  let response = this.fields[0].response;
  response.isDirty = true;

  assert.equal(controller.hasPendingChanges(), true);
});

test('it knows if there have not been any edits', function(assert){
  assert.expect(1);

  let controller = this.subject();

  assert.equal(controller.hasPendingChanges(), false);
});
