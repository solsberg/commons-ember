export default {
  name: 'user-service',
  initialize: function(container, app) {
    app.inject('route', 'userService', 'service:user');
    app.inject('controller', 'userService', 'service:user');
    app.inject('service:user', 'store', 'store:main');
    app.inject('auth:main', 'userService', 'service:user');
  }
};
