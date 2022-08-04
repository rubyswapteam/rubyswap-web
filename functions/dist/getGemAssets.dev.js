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
          console.log('requestOptions');
          console.log(requestOptions);
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, requestOptions));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context.sent;
          console.log(data);
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 15]]);
}