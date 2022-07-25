"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var headers = {
  'X-Looks-Api-Key': '1MZCB8eEi9zpSk6obodU5BMQ',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true'
};

function handler(event) {
  var from, to, contract, API_ENDPOINT, response, data;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          from = event.queryStringParameters.from != undefined ? '&from=' + event.queryStringParameters.from : '';
          to = event.queryStringParameters.to != undefined ? '&to=' + event.queryStringParameters.to : '';
          contract = event.queryStringParameters.contract != undefined ? '&collection=' + event.queryStringParameters.contract : '';
          API_ENDPOINT = 'https://api.looksrare.org/api/v1/events?type=SALE&pagination%5Bfirst%5D=150' + from + to + contract;
          console.log(API_ENDPOINT);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            headers: headers
          }));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Failed fetching data'
            })
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 15]]);
}
