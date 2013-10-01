var SignInRoute = Ember.Route.extend({
  isPublicRoute: true,

  actions: {
    signIn: function(){
      window.alert('signin');
    }
  }
});

export default SignInRoute;
