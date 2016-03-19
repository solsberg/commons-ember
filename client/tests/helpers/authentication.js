import Ember from 'ember';
import { currentSession, authenticateSession, invalidateSession } from 'commons/tests/helpers/ember-simple-auth';

var authenticationHelpers = function(){
  Ember.Test.registerAsyncHelper('fakeLogin',
    function(app, user) {
      user.user_id = user.uid;
      authenticateSession(app, {profile: user});
      currentSession(app).set('isRegistered', true);
    }
  );

  Ember.Test.registerAsyncHelper('fakeLogout',
    function(app) {
      invalidateSession(app);
    }
  );

  Ember.Test.registerAsyncHelper('logout',
    function(app) {
      var session = currentSession(app);
      if (session.get('isAuthenticated')){
        session.invalidate();
      }
      return wait();
    }
  );
}();

export default authenticationHelpers;