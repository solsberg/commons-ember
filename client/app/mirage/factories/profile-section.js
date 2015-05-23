import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: (i) => `Section-${i}`,
  order: (i) => i
});
