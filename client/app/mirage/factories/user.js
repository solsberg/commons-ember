import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  uid: (i) => `user${i}`,
  email: (i) => `user${i}@example.com`,
  username: (i) => `user${i}`,
  fullname: (i) => `User${i} Smith`
});
