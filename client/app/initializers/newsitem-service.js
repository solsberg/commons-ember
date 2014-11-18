export default {
  name: 'newsitem-service',
  initialize: function(container, app) {
    app.inject('controller', 'newsItemService', 'service:newsitem');
    app.inject('service:newsitem', 'store', 'store:main');
  }
};
