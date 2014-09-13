import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),
  fullname: DS.attr('string')
});