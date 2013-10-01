var SignInController = Ember.Controller.extend({
  reset: function(){
    this.set('email', null);
    this.set('password', null);
  }.on('init'),
  actions: {
    signIn: function(){
      var credentials = {
            email: this.get('email'),
            password: this.get('password')
          },
          controller = this;
      this.get('session').open(credentials)
        .then(function(user){
          controller.reset();
          controller.transitionToRoute('visage', user);
        }, function(error){
          controller.set('notice', 'There was an error with your username or password');
        });
    }
  }
});

export default SignInController;
