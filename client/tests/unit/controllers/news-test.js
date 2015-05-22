import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

var user = {
  uid: 'user'
};

var new_record = {
  save: function(){
    return Ember.RSVP.resolve();
  }
};

var store = {
  find: function(){
    return Ember.RSVP.resolve([user]);
  },

  createRecord: function(record_type, values){
    return new_record;
  }
};

moduleFor('controller:news', 'NewsController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject({auth: Ember.Object.create({})});
    controller.set('store', store);
  }
});

test('it creates a new newsitem', function(assert) {
  var controller = this.subject();
  controller.set('new_content', "a new post");

  var spy = sinon.spy(store, "createRecord");

  Ember.run(function(){
    controller.send('create');
  });

  assert.ok(spy.calledOnce);
  assert.ok(spy.calledWith('newsitem'));
});

test('it persists the new newsitem to the server', function(assert) {
  var controller = this.subject();
  controller.set('new_content', "a new post");
  var spy = sinon.spy(new_record, "save");
  Ember.run(function(){
    controller.send('create');
  });
  assert.ok(spy.calledOnce);
});


test('it clears the content field after posting', function(assert) {
  var controller = this.subject();
  controller.set('new_content', "another new post");
  Ember.run(function(){
    controller.send('create');
  });
  assert.equal(controller.get('new_content'), '');
});
