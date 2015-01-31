import DS from 'ember-data';

var ProfileQuestion = DS.Model.extend({
  text: DS.attr('string'),
  description: DS.attr('string'),
  type: DS.attr('string'),
  order: DS.attr('number'),
  section: DS.belongsTo('profile-section')
});

ProfileQuestion.reopenClass({
  FIXTURES: [
    {
      id: 1,
      text: "Where did you grow up?",
      order: 6,
      type: "text",
      section: 1
    },
    {
      id: 2,
      text: "Where did you attend synagogue?",
      order: 7,
      type: "text",
      section: 1
    },
    {
      id: 3,
      text: "Where did you attend high school?",
      order: 8,
      type: "text",
      section: 1
    },
    {
      id: 4,
      text: "Where did you attend college?",
      order: 9,
      type: "text",
      section: 1
    },
    {
      id: 5,
      text: "Birthday",
      description: "Your birthday",
      order: 3,
      type: "date",
      section: 1
    },
    {
      id: 6,
      text: "Home Address",
      description: "Please enter your current address - you might find that you are neighbors with other JMR men!",
      order: 4,
      type: "textarea",
      section: 1
    },
    {
      id: 7,
      text: "Phone",
      description: "Please provide the best number(s) for other men to reach you by phone.",
      order: 5,
      type: "tel",
      section: 1
    },
    {
      id: 8,
      text: "Family/Significant Relationships",
      description: "Please tells us about who makes up your immediate family and/or any significant relationships",
      order: 10,
      type: "textarea",
      section: 1
    },
    {
      id: 9,
      text: "Family History & Heritage",
      description: "Please tell us something about your family history and heritage",
      order: 11,
      type: "textarea",
      section: 1
    },
    {
      id: 10,
      text: "Prior JMRs and Jewish men's work",
      description: "Please tell us about which JMRs you have attended and your involvement with Jewish men's work",
      order: 12,
      type: "textarea",
      section: 1
    },
    {
      id: 11,
      text: "What do you do?",
      order: 13,
      type: "textarea",
      section: 2
    },
    {
      id: 12,
      text: "What services or products do you provide that other men might be interested in?",
      description: "How can they best get in touch with you?",
      order: 14,
      type: "textarea",
      section: 2
    },
    {
      id: 13,
      text: "What is especially distinctive about what you have to offer?",
      order: 15,
      type: "textarea",
      section: 2
    },
    {
      id: 14,
      text: "What would you like to be doing?",
      order: 16,
      type: "textarea",
      section: 2
    },
    {
      id: 15,
      text: "How can other men help you?",
      order: 17,
      type: "textarea",
      section: 2
    },
    {
      id: 16,
      text: "Would you like to be in conversation with other men doing similar things?",
      order: 18,
      type: "text",
      section: 2
    },
    {
      id: 17,
      text: "How do you express yourself Jewishly in your work?",
      order: 19,
      type: "textarea",
      section: 2
    },
    {
      id: 18,
      text: "What has your career path been that has gotten you to be doing what you’re doing now?",
      order: 20,
      type: "textarea",
      section: 2
    },
    {
      id: 19,
      text: "Are you willing to mentor other men who are in the same or a similar field?",
      description: "If so, please indicate your interest in the Mentoring section.",
      order: 21,
      type: "text",
      section: 2
    }
  ]
});

export default ProfileQuestion;