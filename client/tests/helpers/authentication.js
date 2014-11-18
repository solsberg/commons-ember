import Ember from 'ember';

var authenticationHelpers = function(){
  Ember.Test.registerAsyncHelper('logout',
    function(app) {
      // click('.logout');
      var container = app.__container__;
      var auth = container.lookup('auth:main');
      auth.logout();
      return wait();
    }
  );
}();

export default authenticationHelpers;