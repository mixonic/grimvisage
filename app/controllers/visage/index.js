var VisageIndexController = Ember.Controller.extend({

  isSelf: function(){
    return (this.get('content.id') === this.get('session.currentUser.id'));
  }.property('content.id', 'session.currentUser.id')

});

export default VisageIndexController;
