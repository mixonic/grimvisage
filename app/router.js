var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Ember.Route.reopen({
  beforeModel: function(transition){
    var session = this.get('session'),
        route   = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      if (session.get('isAuthenticated')) {
        resolve();
      } else {
        session.fetch()
          .then(function(){
            resolve();
          }, function(){
            if (route.get('isPublicRoute')) {
              // Maybe we should not have checked at firebase again...
              resolve();
            } else {
              session.set('afterRedirect', transition);
              reject('unauthenticated');
            }
          });
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
