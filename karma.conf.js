module.exports = function(config) {
  config.set({

    frameworks: ['qunit'],

    files: [
      'bower_components/rsvp/rsvp.js',
      'bower_components/sinon/index.js',
      'dist/globals/main.js',
      // when running broccoli serve, we use this instead
      'http://localhost:4200/globals/main.js',
      'test/**/*.spec.js'
    ],

    basePath: '',

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false

  });
};
