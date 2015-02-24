import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),
  fullname: DS.attr('string'),
  profileResponses: DS.hasMany('profile-response', {async: true})
  // newsitems: DS.hasMany('newsitem', {async: true})
});