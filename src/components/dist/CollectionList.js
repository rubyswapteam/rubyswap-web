"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CollectionNftCard_1 = require("./CollectionNftCard");
var CollectionList = function (_a) {
    var selectedNfts = _a.selectedNfts, scroll = _a.scroll;
    var duration = 200; // ms
    var delay = 100;
    var animStr = function (i) {
        return "fadeIn " + duration + "ms ease-out " + delay + "ms forwards";
    };
    return (react_1["default"].createElement("div", { className: "w-full overflow-scroll h-inherit" },
        react_1["default"].createElement("div", { className: "mt-6 w-full flex flex-col items-start flex-1 px-4 sm:px-6 md:px-8" }, selectedNfts && (react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-4 pb-80" }, selectedNfts.map(function (selectedNft, i) { return (react_1["default"].createElement("div", { className: "opacity-0", key: i, style: { animation: animStr(i) } },
            react_1["default"].createElement(CollectionNftCard_1["default"], { selectedNft: selectedNft }))); }))))));
};
exports["default"] = CollectionList;
