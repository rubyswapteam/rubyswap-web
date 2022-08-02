"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var headers = {
  'X-API-Key': '38d74028-ca13-48df-ab81-bdfa4f3ab834',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true'
};

function handler(event) {
  var from, to, contract, cursor, createdAfter, API_ENDPOINT, response, data;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          from = event.queryStringParameters.from != undefined ? '&from_address=' + event.queryStringParameters.from : '';
          to = event.queryStringParameters.to != undefined ? '&to_address=' + event.queryStringParameters.to : '';
          contract = event.queryStringParameters.contract != undefined ? '&contract=' + event.queryStringParameters.contract : '';
          cursor = event.queryStringParameters.cursor != undefined && event.queryStringParameters.cursor.length > 1 ? '&cursor=' + event.queryStringParameters.cursor : '';
          createdAfter = event.queryStringParameters.createdAfter != undefined && event.queryStringParameters.createdAfter.length > 1 ? '&created_after=' + event.queryStringParameters.createdAfter : '';
          API_ENDPOINT = 'https://api.x2y2.org/v1/events?type=sale&limit=200' + from + to + contract + cursor + createdAfter;
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            headers: headers
          }));

        case 9:
          response = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](6);
          console.log(_context.t0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Failed fetching data'
            })
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 16]]);
}