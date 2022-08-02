"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var headers = (_headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E'
}, _defineProperty(_headers, "Content-Type", 'application/json'), _defineProperty(_headers, "Prefer", 'resolution=merge-duplicates'), _headers);

function handler(event) {
  var API_ENDPOINT, requestOptions, response;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          API_ENDPOINT = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/CollectionDetails';
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
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(response)
          });

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}