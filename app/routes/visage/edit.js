var VisageEditRoute = Ember.Route.extend({
  afterModel: function(){
    var model = this.modelFor('visage'),
        userId = model.get('id'),
        currentUserId = this.get('session.currentUser.id');
    if (userId !== currentUserId){
      this.transitionTo('visage', model);
    }
  }
});

export default VisageEditRoute;
