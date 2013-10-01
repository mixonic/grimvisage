var VisageIndexRoute = Ember.Route.extend({
  isPublicRoute: true,

  model: function(){
    return this.modelFor('visage');
  }

});

export default VisageIndexRoute;
