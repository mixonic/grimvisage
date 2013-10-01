import User from 'appkit/models/user';

var VisageRoute = Ember.Route.extend({
  isPublicRoute: true,

  model: function(params){
    var firebase = this.get('firebase'),
        route = this;
    return firebase.connect().
      then(function(ref){
        return new User(ref, params.id);
      });
  },

  actions: {
    savePhoto: function(photo){
      var user = this.modelFor('visage');
      user.persist({ photo: photo });
      this.transitionTo('visage.index', user);
    }
  }
});

export default VisageRoute;
