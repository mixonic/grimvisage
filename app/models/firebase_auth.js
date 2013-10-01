import User from 'appkit/models/user';

var FirebaseAuth = Ember.Object.extend({

  fetch: function(){
    var auth = this;
    return this.get('firebase').connect()
      .then(function(firebaseRef){
        return Ember.RSVP.Promise(function(resolve, reject){
          var ref = new FirebaseSimpleLogin(firebaseRef, function(error, user){
            if (user) {
              user = new User(firebaseRef, user.id, user);
              resolve(user, ref);
            } else {
              reject(ref);
            }
          });
        });
      });
  },

  open: function(credentials){
    var auth = this;
    return this.get('firebase').connect()
      .then(function(firebaseRef){
        return Ember.RSVP.Promise(function(resolve, reject){
          var initialLogin = true;
          var ref = new FirebaseSimpleLogin(firebaseRef, function(error, user){
            if (initialLogin) {
              initialLogin = false;
              return;
            }
            if (user) {
              user = new User(firebaseRef, user.id, user);
              resolve(user, ref);
            } else {
              reject(ref);
            }
          });
          ref.login('password', credentials);
        });
      });
  },

  close: function(){
    var firebase = this.get('firebase');
    return firebase.connect()
      .then(function(firebaseRef){
        return new Ember.RSVP.Promise(function(resolve, reject){
          var initialLogin = true;
          var ref = new FirebaseSimpleLogin(firebaseRef, function(error, user){
            if (initialLogin) {
              initialLogin = false;
              return;
            }
            if (!error) {
              firebase.reset();
              resolve(ref);
            } else {
              reject(ref);
            }
          });
          ref.logout();
        });
      });
  }

});

export default FirebaseAuth;
