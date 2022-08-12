"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _moment = _interopRequireDefault(require("moment"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _postHeaders;

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

var postHeaders = (_postHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E'
}, _defineProperty(_postHeaders, "Content-Type", 'application/json'), _defineProperty(_postHeaders, "Prefer", 'resolution=merge-duplicates'), _postHeaders);

function handler(event) {
  var API_ENDPOINT, response, data, refreshLimit, _API_ENDPOINT, _response, _newData, requestOptions, POST_API_ENDPOINT;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (event.queryStringParameters.slug) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", {
            statusCode: 500,
            error: 'No slug provided'
          });

        case 2:
          API_ENDPOINT = "https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails?select=*&slug=ilike.".concat(event.queryStringParameters.slug);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          }));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          refreshLimit = (0, _moment["default"])().unix() - 900;
          _context.prev = 11;

          if (!(data[0].updatedAt < refreshLimit)) {
            _context.next = 26;
            break;
          }

          console.log('clause triggered');
          _API_ENDPOINT = 'https://api.opensea.io/api/v1/collection/' + event.queryStringParameters.slug;
          _context.next = 17;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(_API_ENDPOINT, {
            headers: {
              method: 'GET',
              redirect: 'follow'
            }
          }));

        case 17:
          _response = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(_response.json());

        case 20:
          _newData = _context.sent;
          console.log(_API_ENDPOINT);
          console.log(_newData);
          console.log('1');

          if (_newData && _newData.collection) {
            console.log('2');
            collection = {
              test: 1 // contractAddress:
              // newData?.collection?.primary_asset_contracts[0]?.address,
              // editors: newData?.collection?.editors,
              // slug: newData?.collection?.slug,
              // imageUrl: newData?.collection?.image_url,
              // largeImageUrl: newData?.collection?.large_image_url,
              // bannerImageUrl: newData?.collection?.banner_image_url,
              // schemaName:
              //   newData?.collection?.primary_asset_contracts[0]?.schema_name,
              // description: newData?.collection?.description,
              // osVerificationState:
              //   newData?.collection?.safelist_request_status == 'verified',
              // name: newData?.collection?.name,
              // website: newData?.collection?.external_url,
              // discordUrl: newData?.collection?.discord_url,
              // twitterUsername: newData?.collection?.twitter_username,
              // instagramUsername: newData?.collection?.instagram_username,
              // chainId: 1,
              // osOneDayVolume: newData?.collection?.stats.one_day_volume,
              // osOneDaySales: newData?.collection?.stats.one_day_sales,
              // osOneDayChange: newData?.collection?.stats.one_day_change,
              // osSevenDayVolume: newData?.collection?.stats.seven_day_volume,
              // osSevenDaySales: newData?.collection?.stats.seven_day_sales,
              // osSevenDayChange: newData?.collection?.stats.seven_day_change,
              // osThirtyDaySales: newData?.collection?.stats.thirty_day_sales,
              // osThirtyDayVolume: newData?.collection?.stats.thirty_day_volume,
              // osThirtyDayChange: newData?.collection?.stats.thirty_day_change,
              // osTotalVolume: newData?.collection?.stats.total_volume,
              // osTotalSales: newData?.collection?.stats.total_sales,
              // osFloorPrice: newData?.collection?.stats.floor_price,
              // numOwners: newData?.collection?.stats.num_owners,
              // totalSupply: newData?.collection?.stats.total_supply,
              // traits: JSON.stringify(newData?.collection?.traits),
              // updatedAt: moment().unix(),
              // osStatsUpdatedAt: moment().unix(),

            };
            console.log('3');
          }

          requestOptions = {
            method: 'POST',
            headers: postHeaders,
            body: event.body,
            redirect: 'follow'
          };

        case 26:
          POST_API_ENDPOINT = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails';
          (0, _nodeFetch["default"])(POST_API_ENDPOINT, requestOptions);
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify([newData])
          });

        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](11);
          console.log('Failed to Updated collection');

        case 34:
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 37:
          _context.prev = 37;
          _context.t1 = _context["catch"](3);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t1
            })
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 37], [11, 31]]);
}