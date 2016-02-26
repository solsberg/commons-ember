import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: config.apiHost,
  shouldReloadAll(){
    return true;
  },
  shouldBackgroundReloadRecord(){
    return false;
  }
});
