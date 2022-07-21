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
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true'
};

function handler(event) {
  var assetOwner, offset, API_ENDPOINT, response, data;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          assetOwner = event.queryStringParameters.assetOwner != undefined ? '&asset_owner=' + event.queryStringParameters.assetOwner : '';
          offset = event.queryStringParameters.offset != undefined ? '&offset=' + event.queryStringParameters.offset : '';
          API_ENDPOINT = 'https://api.opensea.io/api/v1/collections?limit=300' + assetOwner + offset;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            headers: headers
          }));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Failed fetching data'
            })
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
}