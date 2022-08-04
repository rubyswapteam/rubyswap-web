"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _require = require('@supabase/supabase-js'),
    createClient = _require.createClient; // Connect to our database


var supabase = createClient('https://mqxsyzoydluqyuigceuy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeHN5em95ZGx1cXl1aWdjZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNDk0MzMsImV4cCI6MTk3MzgyNTQzM30.lnxvp4ZngLQkTZn_jkpQbAImyuYb3CBMF88iJAbNJ3E'); // Our standard serverless handler function

function handler(event) {
  var _ref, data, error;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Insert a row
          console.log(event.queryStringParameters.slug);
          _context.next = 3;
          return regeneratorRuntime.awrap(supabase.from('CollectionDetails').select('*').ilike('slug', event.queryStringParameters.slug));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          error = _ref.error;
          console.log(data);
          console.log(!Object.keys(data).length || error);
          console.log(JSON.stringify(data));

          if (!(!Object.keys(data).length || error)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Failed fetching data'
            })
          });

        case 11:
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify(data)
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
} // export async function handler(event) {
//   const API_ENDPOINT =
//     'https://mqxsyzoydluqyuigceuy.supabase.co/rest/v1/ContractSlugMapping';
//   var requestOptions = {
//     method: 'GET',
//     headers: headers,
//     body: event.body,
//     redirect: 'follow',
//   };
//   try {
//     const response = await fetch(API_ENDPOINT, requestOptions);
//     // const data = await response.json();
//     return { statusCode: 200, body: JSON.stringify(data) };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error }),
//     };
//   }
// }