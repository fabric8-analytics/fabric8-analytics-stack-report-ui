const {
  SpecReporter
} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 50000,
  specs: [
    'src/tests/**/*.spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:3333/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--headless']
    }
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
  params: {
    ANALYSES_REQUEST_ID: 'default',
    RECOMMENDER_API_TOKEN: 'default',
    RECOMMENDER_API_END_POINT: 'default'
  }
};
