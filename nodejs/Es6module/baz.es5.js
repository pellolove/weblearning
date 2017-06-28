"use strict";

var _bar = require("bar");

var bar = _interopRequireWildcard(_bar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log("2π = " + bar.sum(bar.pi, bar.pi)); // app.js
