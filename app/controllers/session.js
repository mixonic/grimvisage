var SessionController = Ember.Object.extend({
  isAuthenticated: false,
  currentUser: null,
  afterRedirect: null,

  open: function(credentials){
    var session = this;
    return this.get('adapter').open(credentials, this)
      .then(function(user){
        session.set('isAuthenticated', true);
        session.set('currentUser', user);
        return user;
      }, Ember.RSVP.reject);
  },

  fetch: function(){
    var session = this;
    return this.get('adapter').fetch(this)
      .then(function(user){
        session.set('isAuthenticated', true);
        session.set('currentUser', user);
        return user;
      }, Ember.RSVP.reject);
  },

  close: function(){
    var session = this;
    return this.get('adapter').close(this)
      .then(function(ref){
        session.set('isAuthenticated', false);
        session.set('currentUser', null);
        return ref;
      }, Ember.RSVP.reject);
  }
});

export default SessionController;
