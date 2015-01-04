import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  question_id: DS.attr('number')
});
