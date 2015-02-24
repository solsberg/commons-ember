import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'user/profile-section',
  sortProperties: ['section.order'],

  actions: {
    saveChanges: function(){
      this.forEach(function(item){
        item.saveChanges();
      });
    }
  }
});
