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

!function(){"function"!=typeof Object.assign&&(Object.assign=function(n){if(void 0===n||null===n)throw new TypeError("Cannot convert undefined or null to object");for(var o=Object(n),r=1;r<arguments.length;r++){var t=arguments[r];if(void 0!==t&&null!==t)for(var e in t)t.hasOwnProperty(e)&&(o[e]=t[e])}return o})}();
