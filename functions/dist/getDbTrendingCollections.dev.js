"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

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

function handler() {
  var API_ENDPOINT, response, data;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          API_ENDPOINT = 'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/TrendingTable?select=*&order=index.asc';
          console.log({
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(API_ENDPOINT, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          }));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: _context.t0
            })
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}