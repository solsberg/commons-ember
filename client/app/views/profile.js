import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    Ember.$('#myTab a:first').tab('show');
  }
});
