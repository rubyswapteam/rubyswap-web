"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN'
};

function handler(event) {
  var API_ENDPOINT, requestOptions, response, data;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          API_ENDPOINT = 'https://gem-public-api.herokuapp.com/assets';
          requestOptions = {
            method: 'POST',
            headers: headers,
            body: event.body,
            redirect: 'follow'
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, requestOptions));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}