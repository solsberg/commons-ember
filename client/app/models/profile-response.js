import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  questionId: DS.attr('number'),
  user: DS.belongsTo('user')
});
