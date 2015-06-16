var dist = require('broccoli-dist-es6-module');

module.exports = dist('lib', {
  // the entry script, and module that becomes the global
  main: 'main',

  // will become window.ic.ajax with the exports from `main`
  global: 'fl.APIService',

  // the prefix for named-amd modules
  packageName: 'fl-api-service',

  // shim rsvp
  shim: {
    'rsvp': 'RSVP'
  }
});
