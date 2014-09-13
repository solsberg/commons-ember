import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',

  xinit: function(){
    var self = this;
    this.get('auth').addObserver('authorized', function(){
      self.transitionToRoute('index');
    });
  },

  actions: {
    login: function(){
      var self = this;
      this.userService.findByUsername(this.email).then(function(user){
        self.get('auth').login(user.get('email'), self.get('password')).then(function(result){
          self.transitionToRoute('index');
        return result;
        });
      });
    }
  }
});
