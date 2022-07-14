"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CollectionNftCard_1 = require("./CollectionNftCard");
var CollectionList = function (_a) {
    var selectedNfts = _a.selectedNfts;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "mt-6 w-full flex flex-col items-start flex-1 px-4 sm:px-6 md:px-8" }, selectedNfts && (react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-4" }, selectedNfts.map(function (selectedNft) { return (react_1["default"].createElement(CollectionNftCard_1["default"], { key: selectedNft.id, selectedNft: selectedNft })); }))))));
};
exports["default"] = CollectionList;
