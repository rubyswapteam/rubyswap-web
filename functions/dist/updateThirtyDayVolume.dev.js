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
  var GEM_API_ENDPOINT, gemRequestOptions, SUPABASE_API_ENDPOINT, responseGem, data, collections, timestamp, i, collection, supabaseRequestOptions, responseSupabase;
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
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(GEM_API_ENDPOINT, gemRequestOptions));

        case 6:
          responseGem = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(responseGem.json());

        case 9:
          data = _context.sent;
          collections = [];
          timestamp = (0, _moment["default"])().unix();

          for (i = 0; i < data.data.length; i++) {
            collection = {
              period: 'thirty_day',
              slug: data.data[i].slug,
              description: data.data[i].description,
              discordUrl: data.data[i].discordUrl,
              imageUrl: data.data[i].imageUrl,
              instagramUsername: data.data[i].instagramUsername,
              osVerificationState: data.data[i].isVerified,
              name: data.data[i].name,
              twitterUsername: data.data[i].twitterUsername,
              osOneDayVolume: data.data[i].stats.one_day_volume,
              osOneDaySales: data.data[i].stats.one_day_sales,
              osOneDayChange: data.data[i].stats.one_day_change,
              osSevenDayVolume: data.data[i].stats.seven_day_volume,
              osSevenDaySales: data.data[i].stats.seven_day_sales,
              osSevenDayChange: data.data[i].stats.seven_day_change,
              osThirtyDaySales: data.data[i].stats.thirty_day_sales,
              osThirtyDayVolume: data.data[i].stats.thirty_day_volume,
              osThirtyDayChange: data.data[i].stats.thirty_day_change,
              osTotalVolume: data.data[i].stats.total_volume,
              osTotalSales: data.data[i].stats.total_sales,
              osFloorPrice: data.data[i].stats.floor_price,
              numOwners: data.data[i].stats.num_owners,
              totalSupply: data.data[i].stats.total_supply,
              updatedAt: timestamp
            };
            collections.push(collection);
          }

          supabaseRequestOptions = {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify(collections),
            redirect: 'follow'
          };
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(SUPABASE_API_ENDPOINT, supabaseRequestOptions));

        case 16:
          responseSupabase = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(responseSupabase)
          });

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 20]]);
}