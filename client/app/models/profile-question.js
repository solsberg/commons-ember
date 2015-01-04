import DS from 'ember-data';

var ProfileQuestion = DS.Model.extend({
  text: DS.attr('string')
});

ProfileQuestion.reopenClass({
  FIXTURES: [
    {
      id: 1,
      text: "Where did you grow up?"
    },
    {
      id: 2,
      text: "Where did you attend synagogue?"
    },
    {
      id: 3,
      text: "Where did you attend high school?"
    },
    {
      id: 4,
      text: "Where did you attend college?"
    },
  ]
});

export default ProfileQuestion;