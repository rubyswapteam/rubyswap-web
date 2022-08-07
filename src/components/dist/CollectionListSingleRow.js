"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CollectionNftCard_1 = require("./CollectionNftCard");
var CollectionListSingleRow = function (_a) {
    var selectedNfts = _a.selectedNfts, collectionName = _a.collectionName, chainId = _a.chainId;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "w-full flex flex-col items-start flex-1 overflow-scroll py-8 px-4 sm:px-6 md:px-8" }, selectedNfts && (react_1["default"].createElement("div", { className: "w-[250%] lg:w-[200%] xl:w-[166%] grid grid-cols-1 gap-y-10 gap-x-5 grid-cols-10" }, selectedNfts.map(function (selectedNft) { return (react_1["default"].createElement(CollectionNftCard_1["default"], { key: (selectedNft === null || selectedNft === void 0 ? void 0 : selectedNft.id) + (selectedNft === null || selectedNft === void 0 ? void 0 : selectedNft.tokenId), selectedNft: selectedNft, collectionName: collectionName, chainId: chainId })); }))))));
};
exports["default"] = CollectionListSingleRow;
