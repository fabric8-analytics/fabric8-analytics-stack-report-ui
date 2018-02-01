import 'reflect-metadata';
import 'mdn-polyfills/Object.assign';

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}

(function(){"function"!=typeof Object.assign&&(Object.assign=function(n){if(void 0===n||null===n)throw new TypeError("Cannot convert undefined or null to object");for(var o=Object(n),r=1;r<arguments.length;r++){var t=arguments[r];if(void 0!==t&&null!==t)for(var e in t)t.hasOwnProperty(e)&&(o[e]=t[e])}return o})})();
