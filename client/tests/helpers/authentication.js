import Ember from 'ember';

var authenticationHelpers = function(){
  Ember.Test.registerAsyncHelper('fakeLogin',
    function(app, user) {
      var container = app.__container__;
      var session = container.lookup('simple-auth-session:main');
      session.set('isAuthenticated', true);
      session.set('user', user);
    }
  );

  Ember.Test.registerAsyncHelper('fakeLogout',
    function(app) {
      var container = app.__container__;
      var session = container.lookup('simple-auth-session:main');
      session.set('isAuthenticated', false);
      session.set('user', null);
    }
  );

  Ember.Test.registerAsyncHelper('logout',
    function(app) {
      var container = app.__container__;
      var session = container.lookup('simple-auth-session:main');
      if (session.get('isAuthenticated')){
        session.invalidate();
      }
      return wait();
    }
  );
}();

export default authenticationHelpers;