var VisageEditRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('visage');
  },
  afterModel: function(model){
    var userId = model.get('id'),
        currentUserId = this.get('session.currentUser.id');
    if (userId !== currentUserId){
      this.transitionTo('visage.index', model);
    }
  }
});

export default VisageEditRoute;
