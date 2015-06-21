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
  }

});
