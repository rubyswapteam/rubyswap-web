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
  'Access-Control-Allow-Credentials': 'true',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN'
};

function handler(event) {
  var raw, API_ENDPOINT, requestOptions, response;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          raw = JSON.stringify({
            filters: {
              address: event.queryStringParameters.contract
            },
            limit: 100,
            offset: event.queryStringParameters.contract || 0,
            fields: {
              name: 1,
              address: 1,
              isVerified: 1,
              updatedAt: 1,
              currentEthPrice: 1,
              marketplace: 1,
              market: 1,
              imageUrl: 1
            },
            sort: {
              currentEthPrice: 'asc'
            }
          });
          API_ENDPOINT = 'https://gem-public-api.herokuapp.com/assets';
          requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
          };
          _context.prev = 3;
          console.log(requestOptions);
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, requestOptions));

        case 7:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(response)
          });

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 11]]);
}