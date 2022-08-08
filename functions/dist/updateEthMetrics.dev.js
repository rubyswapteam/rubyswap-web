"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _moment = _interopRequireDefault(require("moment"));

var _supabaseHeaders;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var gemHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'X-API-KEY': '2HfiPw08VM8bPffneEZNNanybFAW7ZRN'
};
var supabaseHeaders = (_supabaseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E'
}, _defineProperty(_supabaseHeaders, "Content-Type", 'application/json'), _defineProperty(_supabaseHeaders, "Prefer", 'resolution=merge-duplicates'), _supabaseHeaders);

function handler(event) {
  var GEM_API_ENDPOINT, gemRequestOptions, SUPABASE_API_ENDPOINT, ethPrice, gasPrice, supabaseRequestOptions, responseSupabase;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          GEM_API_ENDPOINT = 'https://gem-public-api.herokuapp.com/collections';
          gemRequestOptions = {
            method: 'POST',
            headers: gemHeaders,
            body: JSON.stringify({
              sort: {
                'stats.thirty_day_volume': -1
              },
              limit: 100,
              fields: {
                name: 1,
                contract: 1,
                slug: 1,
                symbol: 1,
                standard: 1,
                description: 1,
                address: 1,
                createdDate: 1,
                externalUrl: 1,
                imageUrl: 1,
                totalSupply: 1,
                owners: 1,
                sevenDayVolume: 1,
                oneDayVolume: 1,
                stats: 1,
                indexingStatus: 1,
                discordUrl: 1,
                instagramUsername: 1,
                isVerified: 1,
                lastNumberOfUpdates: 1,
                websiteUrl: 1,
                telegramUrl: 1,
                twitterUsername: 1,
                marketStats: 1,
                updatedAt: 1,
                wikiUrl: 1
              }
            }),
            redirect: 'follow'
          };
          SUPABASE_API_ENDPOINT = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/TrendingTable';
          _context.prev = 3;
          _context.t0 = regeneratorRuntime;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'));

        case 7:
          _context.t1 = _context.sent.json();
          _context.next = 10;
          return _context.t0.awrap.call(_context.t0, _context.t1);

        case 10:
          ethPrice = _context.sent;
          _context.t2 = regeneratorRuntime;
          _context.next = 14;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=SY2NX9JWTZMSJWDD68G3NXMJT7SAJBF34J'));

        case 14:
          _context.t3 = _context.sent.json();
          _context.next = 17;
          return _context.t2.awrap.call(_context.t2, _context.t3);

        case 17:
          gasPrice = _context.sent;
          supabaseRequestOptions = {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify({
              gas: gasPrice.result.SafeGasPrice,
              eth: ethPrice.ethereum.usd
            }),
            redirect: 'follow'
          };
          _context.next = 21;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(SUPABASE_API_ENDPOINT, supabaseRequestOptions));

        case 21:
          responseSupabase = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(responseSupabase)
          });

        case 25:
          _context.prev = 25;
          _context.t4 = _context["catch"](3);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t4
            })
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 25]]);
}