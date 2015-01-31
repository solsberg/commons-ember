import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'profile-section',
  sortProperties: ['section.order'],

  actions: {
    saveChanges: function(){
      this.forEach(function(item){
        item.saveChanges();
      });
    }
  }
});
