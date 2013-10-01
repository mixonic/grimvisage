var WebcamSnapper = Ember.Component.extend({
  isRejected: false,
  reset: function(){
    this.video = this.$('video');
    this.canvas = this.$('canvas');
    this.ctx = this.canvas[0].getContext('2d');
    this.localMediaStream = null;

    var component = this;
    navigator.webkitGetUserMedia({video: true}, function(stream) {
      component.video.attr('src', window.URL.createObjectURL(stream));
      component.localMediaStream = stream;
    }, function(){
      Ember.run(function(){
        component.set('isRejected', true);
      });
    });
  }.on('didInsertElement'),
  actions: {
    snap: function(){
      if (this.localMediaStream) {
        this.ctx.drawImage(this.video[0], 0, 0, 307, 250);
        // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
        var dataURL = this.canvas[0].toDataURL('image/webp');
        this.sendAction('snap', dataURL);
      }
    }
  }
});

export default WebcamSnapper;
