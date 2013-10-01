function attachFirebaseObserver(ref, user){
  ref.on('value', function(snapshot){
    var attrs = snapshot.val();
    if (attrs) { Ember.run(user, user.setProperties, attrs); }
  });
}

function removeFirebaseObserver(ref){
  ref.off('value');
}

var User = Ember.Object.extend({
  // There are several other attributes besides
  // these.
  id: null,
  photo: null,

  init: function(ref, id, attrs) {
    this.set('firebaseRef', ref);
    this.set('id', id);
    if (attrs) { this.setProperties(attrs); }
  },

  persist: function(attrs){
    return this.get('userRef').set(attrs);
  },

  userRef: function(){
    return this.get('firebaseRef').child('users/'+this.get('id'));
  }.property('firebaseRef', 'id'),

  updateFirebaseObserver: function(){
    var ref = this.get('userRef'),
        user = this;
    if (ref) { attachFirebaseObserver(ref, user); }
  }.observes('userRef').on('init'),

  removeFirebaseObserver: function(){
    var ref = this.get('userRef');
    if (ref) { removeFirebaseObserver(ref); }
  }.on('willDestroy')

});

export default User;
