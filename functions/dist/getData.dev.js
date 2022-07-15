"use strict";

exports.handler = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            body: 'test',
            statusCode: 200
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};