"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const fetch = require('node-fetch');
var headers = {
  // 'content-type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  'X-API-KEY': '38d74028-ca13-48df-ab81-bdfa4f3ab834'
};
var API_ENDPOINT = 'https://api.x2y2.org/v1/events?type=sale&from_address&to_address=0x2ef1630993bc569a18f8c406ab720e2d040e155a&contract';

function handler() {
  var response;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, headers));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: response
          });

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Failed fetching data'
            })
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}