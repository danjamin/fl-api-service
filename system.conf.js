System.config({
  baseURL: '/',

  paths: {
    babel: 'node_modules/babel-core/browser.js',
    'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
    rsvp: 'bower_components/rsvp/rsvp.js',
    systemjs: 'node_modules/systemjs/dist/system.js',
    'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
  },

  transpiler: 'babel'
});
