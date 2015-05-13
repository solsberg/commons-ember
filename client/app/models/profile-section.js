import DS from 'ember-data';

var ProfileSection = DS.Model.extend({
  title: DS.attr('string'),
  order: DS.attr('number'),
  questions: DS.hasMany('profile-question')
});

ProfileSection.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: "General Information",
      order: 1,
      questions: [1,2,3,4,5,6,7,8,9,10]
    },
    {
      id: 2,
      title: "Professional Networking",
      order: 2,
      questions: [11]
    },
    {
      id: 3,
      title: "Mentoring",
      order: 3,
      questions: [20,21]
    },
    {
      id: 4,
      title: "Other Interests",
      order: 4,
      questions: [22,23,24]
    }
  ]
});

export default ProfileSection;