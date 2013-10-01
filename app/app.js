import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';

var App = Ember.Application.extend({
  LOG_MODULE_RESOLVER: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application){
    registerComponents(container);
  }
});

Ember.Application.initializer({
  name: 'authentication',
  initialize: function(container, app){

    import Session from 'appkit/controllers/session';
    container.register('session:main', Session);
    app.inject('controller', 'session', 'session:main');
    app.inject('route',      'session', 'session:main');

    import FirebaseAdapter from 'appkit/adapters/firebase';
    container.register('adapter:firebase', FirebaseAdapter);
    app.inject('controller', 'firebase', 'adapter:firebase');
    app.inject('route',      'firebase', 'adapter:firebase');

    import FirebaseAuth from 'appkit/models/firebase_auth';
    container.register('session:adapter', FirebaseAuth);
    app.inject('session:adapter', 'firebase', 'adapter:firebase');
    app.inject('session:main',    'adapter',  'session:adapter');
  }
});

export default App;
