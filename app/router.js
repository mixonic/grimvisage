var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Ember.Route.reopen({
  beforeModel: function(transition){
    var session = this.get('session'),
        route   = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      if (!route.get('isPublicRoute') && !session.get('isAuthenticated')){
        session.fetch().then(resolve, function(){
          session.set('afterRedirect', transition);
          reject('unauthenticated');
        });
      } else {
        resolve();
      }
    });
  }
});

Router.map(function(){
  this.resource('visage', { path: '/:id' }, function(){
    this.route('edit');
  });
});

export default Router;
