let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    allScriptsTimeout: 50000,
    useAllAngular2AppRoots: true,
    getPageTimeout: 30000,
    directConnect: process.env.DIRECT_CONNECT === 'true',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./spec/**/*.spec.js'],
    suites: {
        fullTest:  './spec/**/*.spec.js'
    },
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 60000,
        print: function () {
        }
    },
    troubleshoot: true,
    capabilities: {
        'browserName': 'chrome',
        'shardTestFiles': true,
        'loggingPrefs': {
            'driver': 'WARNING',
            'server': 'WARNING',
            'browser': 'INFO'
        },
        'chromeOptions': {
            'args': process.env.HEADLESS_MODE === 'true'? ['--no-sandbox', '--headless'] : ['--no-sandbox']
        }
    },

    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
            displayStacktrace: true,
            displayDuration: true,
        },
        summary: {
            displayDuration: true
        }
        }));
    }
};
