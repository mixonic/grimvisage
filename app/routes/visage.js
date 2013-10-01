var VisageRoute = Ember.Route.extend({
  isPublicRoute: true,

  model: function(params){
    return Ember.Object.create({id: params.id});
  },

  afterModel: function(model){
    var firebase = this.get('firebase'),
        route = this;
    firebase.connect()
      .then(function(ref){
        console.log('ref', ref);
        return ref.child('users/'+model.get('id'));
      }).then(function(userRef){
        console.log('use ref', userRef);
        route.userRef = userRef;
        userRef.on('value', function(snapshot){
          console.log('value');
          var obj = snapshot.val();
          if (obj) {
            Ember.run(function(){
              console.log('updating to', obj);
              model.setProperties(obj);
            });
          }
        });
        return model;
      });
  },

  actions: {
    savePhoto: function(photo){
      this.userRef.set({ photo: photo });
    },
    willTransition: function(){
      this.userRef.off('value');
    }
  }
});

export default VisageRoute;
