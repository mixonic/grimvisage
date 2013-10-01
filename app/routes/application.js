var ApplicationRoute = Ember.Route.extend({
  isPublicRoute: true,

  actions: {
    signOut: function(){
      this.get('session').close()
        .then(function(){
          window.App.reset();
        }, Ember.RSVP.rethrow);
    },

    error: function(reason){
      if (reason === 'unauthenticated'){
        this.transitionTo('index');
      }
    }
  }
});

export default ApplicationRoute;
