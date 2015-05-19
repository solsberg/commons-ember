import Ember from 'ember';

export function navbarLinkClass(args /*, hash*/) {
  var section_name = args[0],
      currentRouteName = args[1];
  return currentRouteName.indexOf(section_name) == 0 ? "active" : "";
}

export default Ember.HTMLBars.makeBoundHelper(navbarLinkClass);
