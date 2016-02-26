import Ember from 'ember';
import { currentSession, authenticateSession, invalidateSession } from 'commons/tests/helpers/ember-simple-auth';

var authenticationHelpers = function(){
  Ember.Test.registerAsyncHelper('fakeLogin',
    function(app, user) {
      // // var container = app.__container__;
      // var session = container.lookup('simple-auth-session:main');
      // session.set('isAuthenticated', true);
      // session.set('data', {authenticated: {user: user}});
      authenticateSession(app, {user: user, auth_info: {}});
    }
  );

  Ember.Test.registerAsyncHelper('fakeLogout',
    function(app) {
      // var container = app.__container__;
      // var session = container.lookup('simple-auth-session:main');
      // session.set('isAuthenticated', false);
      // session.set('data', null);
      invalidateSession(app);
    }
  );

  Ember.Test.registerAsyncHelper('logout',
    function(app) {
      // var container = app.__container__;
      // var session = container.lookup('simple-auth-session:main');
      var session = currentSession(app);
      if (session.get('isAuthenticated')){
        session.invalidate();
      }
      return wait();
    }
  );
}();

export default authenticationHelpers;