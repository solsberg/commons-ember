import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

var user = {
  uid: 'user'
};

var store = {
  find: function(){
    return Ember.RSVP.resolve([user]);
  },

  createRecord: function(record_type, values){
    this.newRecordType = record_type;
    this.newRecord = values;
    this.newRecord.save = function(){
      this.didSave = true;
      return Ember.RSVP.resolve();
    }.bind(this);
    return this.newRecord;
  },

  newRecord: undefined,
  newRecordType: undefined,
  didSave: false
};

moduleFor('controller:news', 'NewsController', {
  // Specify the other units that are required for this test.
  setup: function(){
    var controller = this.subject({auth: Ember.Object.create({})});
    controller.set('store', store);
  }
});

test('it creates a new newsitem', function() {
  var controller = this.subject();
  controller.set('new_content', "a new post");
  store.newRecordType = undefined;
  store.newRecord = undefined;
  Ember.run(function(){
    controller.send('create');
  });
  equal(store.newRecordType, 'newsitem');
  equal(store.newRecord.content, 'a new post');
});

test('it persists the new newsitem to the server', function() {
  var controller = this.subject();
  controller.set('new_content', "a new post");
  store.didSave = false;
  Ember.run(function(){
    controller.send('create');
  });
  equal(store.didSave, true);
});


test('it clears the content field after posting', function() {
  var controller = this.subject();
  controller.set('new_content', "another new post");
  Ember.run(function(){
    controller.send('create');
  });
  equal(controller.get('new_content'), '');
});
