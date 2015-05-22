import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

moduleFor('controller:news', 'NewsController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject({auth: Ember.Object.create({})});

    this.store = {};
    this.new_record = {};

    const user = {
      uid: 'user'
    };

    this.new_record.save = sinon.stub();
    this.new_record.save.returns(Ember.RSVP.resolve());

    this.store.createRecord = sinon.stub();
    this.store.createRecord.returns(this.new_record);

    this.store.find = sinon.stub();
    this.store.find.returns(Ember.RSVP.resolve([user]));

    controller.set('store', this.store);
  }
});

test('it creates a new newsitem', function(assert) {
  var controller = this.subject();

  controller.set('new_content', "a new post");

  Ember.run(function(){
    controller.send('create');
  });

  assert.ok(this.store.createRecord.calledOnce);
  assert.ok(this.store.createRecord.calledWith('newsitem'));
});

test('it persists the new newsitem to the server', function(assert) {
  var controller = this.subject();
  controller.set('new_content', "a new post");

  Ember.run(function(){
    controller.send('create');
  });

  assert.ok(this.new_record.save.calledOnce);
});


test('it clears the content field after posting', function(assert) {
  var controller = this.subject();
  controller.set('new_content', "another new post");

  Ember.run(function(){
    controller.send('create');
  });

  assert.equal(controller.get('new_content'), '');
});
