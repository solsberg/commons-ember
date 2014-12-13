import Ember from 'ember';

var authenticationHelpers = function(){
  Ember.Test.registerAsyncHelper('logout',
    function(app) {
      var container = app.__container__;
      var session = container.lookup('simple-auth-session:main');
      if (session.isAuthenticated){
        session.invalidate();
      }
      return wait();
    }
  );
}();

export default authenticationHelpers;