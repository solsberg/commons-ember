import Mirage from 'ember-cli-mirage';
import moment from 'npm:moment';

export default Mirage.Factory.extend({
  timestamp: function(){
    return moment();
  }
});
