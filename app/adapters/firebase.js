var FirebaseAdapter = Ember.Object.extend({

  reset: function(){
    this.ref = null;
  },

  connect: function(){
    if (this.ref) {
      return Ember.RSVP.resolve(this.ref);
    } else {
      var adapter = this;
      return Ember.RSVP.all([
        Ember.$.getScript('https://cdn.firebase.com/v0/firebase.js'),
        Ember.$.getScript('https://cdn.firebase.com/v0/firebase-simple-login.js')
      ]).then(function(){
        adapter.ref = new Firebase('https://grimvisage.firebaseio.com');
        return adapter.ref;
      }, Ember.RSVP.rethrow);
    }
  }

});

export default FirebaseAdapter;
