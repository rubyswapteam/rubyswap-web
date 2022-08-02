"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var StatsBoxList = function (_a) {
    var stats = _a.stats, route = _a.route;
    return (react_1["default"].createElement(link_1["default"], { href: route || '', passHref: true },
        react_1["default"].createElement("div", { className: "px-4 sm:px-6 md:px-8" },
            react_1["default"].createElement("dl", { className: "grid grid-cols-1 gap-5 sm:grid-cols-5" }, stats.map(function (item) { return (react_1["default"].createElement("div", { key: item.name, className: "text-center px-2 py-3 bg-white drop-shadow-md rounded-lg overflow-hidden sm:p-4 hover:bg-gray-50 cursor-pointer" },
                react_1["default"].createElement("dt", { className: "text-base font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600" }, item.name),
                react_1["default"].createElement("dd", { className: "mt-1 text-base font-semibold text-gray-900" }, item.value))); })))));
};
exports["default"] = StatsBoxList;
