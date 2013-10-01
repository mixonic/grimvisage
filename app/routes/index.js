var IndexRoute = Ember.Route.extend({
  isPublicRoute: true,

  redirect: function(){
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('visage', this.get('session.currentUser'));
    }
  }

});

export default IndexRoute;
