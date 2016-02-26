import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: config.apiHost,
  shouldReloadAll(){
    return true;
  },
  shouldBackgroundReloadRecord(){
    return false;
  }
});
