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

  ENV["simple-auth"] = {
    routeAfterAuthentication: 'index',
    authenticationRoute: 'login',
    routeIfAlreadyAuthenticated: 'index'
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: "i3223lIqqYk2UQ4WpkMRHd6Dg4XWxr2E",
    domain: "solsberg.auth0.com"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiHost = 'http://localhost:3000';
    ENV.authHost = ENV.apiHost;

    ENV["ember-cli-mirage"] = {
      enabled: false
    };

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://*.auth0.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' data: https://cdn.auth0.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' solsberg.auth0.com " + ENV.apiHost, // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' data: http://www.gravatar.com",
      'style-src': "'self' 'unsafe-inline'", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
      'media-src': "'self'"
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.apiHost = '';
    ENV.authHost = 'http://localhost:3000';

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
