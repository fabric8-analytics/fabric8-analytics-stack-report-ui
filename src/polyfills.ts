import 'reflect-metadata';
import 'mdn-polyfills/Object.assign';
import 'core-js/es6';
if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
