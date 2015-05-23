import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  text: (i) => `Question #${i}`,
  type: 'text',
  order: (i) => i,
  section: 1
});
