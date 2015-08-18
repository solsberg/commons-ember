import Ember from 'ember';

var navbarLinkClass = function(args) {
  var section_name = args[0],
      currentRouteName = args[1];
  return currentRouteName.indexOf(section_name) === 0 ? "active" : "";
};

export default Ember.Helper.helper(navbarLinkClass);
