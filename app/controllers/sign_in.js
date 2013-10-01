var SignInController = Ember.Controller.extend({
  reset: function(){
    this.set('email', null);
    this.set('password', null);
    this.set('rememberMe', true);
  }.on('init'),
  actions: {
    signIn: function(){
      var credentials = {
            email: this.get('email'),
            password: this.get('password'),
            rememberMe: this.get('rememberMe')
          },
          controller = this;
      this.get('session').open(credentials)
        .then(function(user){
          controller.reset();
          controller.transitionToRoute('visage.index', user);
        }, function(error){
          controller.set('notice', 'There was an error with your username or password');
        });
    }
  }
});

export default SignInController;
