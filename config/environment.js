/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'commons',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval'", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self'", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' wss://*.firebaseio.com https://auth.firebase.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' data: http://www.gravatar.com",
      'style-src': "'self'", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
      'media-src': "'self'"
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
