"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var headers = _defineProperty({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E'
}, "Content-Type", 'application/json');

function handler(event) {
  var contract, API_ENDPOINT, response, data, ALCHEMY_API_ENDPOINT, SUPABASE_API_ENDPOINT, responseAlchemy, _data, body, supabaseRequestOptions;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          contract = event.queryStringParameters.contract != undefined ? event.queryStringParameters.contract : '';

          if (contract) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", {
            statusCode: 500,
            error: 'No contract provided'
          });

        case 3:
          API_ENDPOINT = "https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Holders?select=*&contract=ilike.".concat(contract);
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          }));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context.sent;

          if (!(data && data[0] && data[0].data && data[0].updatedAt > Math.floor((0, _moment["default"])().unix() - 86400))) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 15:
          ALCHEMY_API_ENDPOINT = "https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getOwnersForCollection?contractAddress=".concat(contract, "&withTokenBalances=true");
          SUPABASE_API_ENDPOINT = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/Holders';
          _context.prev = 17;
          _context.next = 20;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(ALCHEMY_API_ENDPOINT, {
            method: 'GET',
            redirect: 'follow'
          }));

        case 20:
          responseAlchemy = _context.sent;
          _context.next = 23;
          return regeneratorRuntime.awrap(responseAlchemy.json());

        case 23:
          _context.t0 = function (x) {
            return {
              ownerAddress: x.ownerAddress,
              tokenBalance: x.tokenBalances.length
            };
          };

          _context.t1 = function (a, b) {
            return b.tokenBalance - a.tokenBalance;
          };

          _data = _context.sent.ownerAddresses.map(_context.t0).sort(_context.t1);
          body = {
            contract: contract,
            chainId: 1,
            data: _data,
            updatedAt: Math.floor((0, _moment["default"])().unix())
          };
          supabaseRequestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            redirect: 'follow'
          }; // eslint-disable-next-line @typescript-eslint/no-unused-vars

          (0, _nodeFetch["default"])(SUPABASE_API_ENDPOINT, supabaseRequestOptions);
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify([body])
          });

        case 32:
          _context.prev = 32;
          _context.t2 = _context["catch"](17);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t2
            })
          });

        case 35:
          _context.next = 40;
          break;

        case 37:
          _context.prev = 37;
          _context.t3 = _context["catch"](4);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t3
            })
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 37], [17, 32]]);
}