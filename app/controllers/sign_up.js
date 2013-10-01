var SignUpController = Ember.Controller.extend({
  reset: function(){
    this.setProperties({
      email: null,
      password: null
    });
  }.on('init'),

  actions: {
    signUp: function(){
      var email = this.get('email'),
          password = this.get('password'),
          firebase = this.get('firebase'),
          controller = this;

      firebase.connect()
        .then(function(firebaseRef){
          var auth = new FirebaseSimpleLogin(firebaseRef, Em.K);
          auth.createUser(email, password, function(error, user){
            if (!error) {
              Ember.run(function(){
                controller.set('notice', 'Account created!');
                controller.reset();
                controller.transitionToRoute('index');
              });
            } else {
              Ember.run(function(){
                controller.set('password', null);
                controller.set('notice', 'Sorry, there was a problem');
              });
            }
          });
        }).fail(Ember.RSVP.rethrow);
    }
  }
});

export default SignUpController;
