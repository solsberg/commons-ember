import DS from 'ember-data';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend({
  host: config.apiHost,
  shouldReloadAll(){
    return true;
  },
  shouldBackgroundReloadRecord(){
    return false;
  }
});
