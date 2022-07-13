"use strict";
exports.__esModule = true;
var react_1 = require("react");
var nftUtils_1 = require("@/utils/nftUtils");
var OpenseaIcon_1 = require("@/components/OpenseaIcon");
var PlusIcon_1 = require("@/components/PlusIcon");
var EthereumIcon_1 = require("@/components/EthereumIcon");
var X2Y2Icon_1 = require("./X2Y2Icon");
var LooksRareIcon_1 = require("./LooksRareIcon");
var CollectionNftCard = function (_a) {
    var selectedNft = _a.selectedNft;
    return (react_1["default"].createElement("div", { className: "group relative" },
        react_1["default"].createElement("div", { className: 'drop-shadow-md p-2 rounded-xl text-sm bg-white' },
            react_1["default"].createElement("div", { className: 'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden lg:h-50 lg:aspect-none cursor-pointer' },
                react_1["default"].createElement("img", { src: selectedNft.image, alt: selectedNft.imageAlt, className: "w-full h-full transition-opacity hover:opacity-75 object-center object-cover rounded-xl" }),
                react_1["default"].createElement("a", { target: "_blank", rel: "_ noreferrer", className: "absolute left-3 top-3 w-12 h-12" },
                    selectedNft.marketplace === nftUtils_1.NftMarketplace.OPENSEA && (react_1["default"].createElement("div", { className: "rounded-full" },
                        react_1["default"].createElement(OpenseaIcon_1["default"], { height: 20, width: 20 }))),
                    selectedNft.marketplace === nftUtils_1.NftMarketplace.LOOKSRARE && (react_1["default"].createElement("div", { className: "rounded-full" },
                        react_1["default"].createElement(LooksRareIcon_1["default"], { height: 20, width: 20 }))),
                    selectedNft.marketplace === nftUtils_1.NftMarketplace.X2Y2 && (react_1["default"].createElement("div", { className: "rounded-full" },
                        react_1["default"].createElement(X2Y2Icon_1["default"], { height: 20, width: 20 }))),
                    selectedNft.marketplace === nftUtils_1.NftMarketplace.NFTRADE && (react_1["default"].createElement("div", { className: "rounded-full" },
                        react_1["default"].createElement(OpenseaIcon_1["default"], { height: 20, width: 20 }))),
                    selectedNft.marketplace === nftUtils_1.NftMarketplace.SEAPORT && (react_1["default"].createElement("div", { className: "rounded-full" },
                        react_1["default"].createElement(OpenseaIcon_1["default"], { height: 20, width: 20 })))),
                react_1["default"].createElement("div", { className: "absolute right-2 top-2 w-5 h-5 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-200 transition opacity-0" },
                    react_1["default"].createElement("div", { className: "absolute opacity-20 rounded-full w-full h-full left-0 top-0 bg-white" }),
                    react_1["default"].createElement("div", { className: "w-3 h-3" },
                        react_1["default"].createElement(PlusIcon_1["default"], null))),
                react_1["default"].createElement("span", { className: "border-2 border-white rounded-md absolute left-3 bottom-3 bg-white text-black h-6 px-2 font-bold text-xs flex items-center justify-center" },
                    react_1["default"].createElement("div", null,
                        "#\u00A0",
                        selectedNft.tokenId))),
            react_1["default"].createElement("div", { className: "justify-between flex py-2 mb-2 border-b border-gray-50" },
                react_1["default"].createElement("div", { className: "text-[10px] font-bold" }, selectedNft.collectionName),
                react_1["default"].createElement("div", { className: "px-2 pt-[2px] border border-gray-100 rounded-md transition-colors hover:bg-gray-100 cursor-pointer" },
                    react_1["default"].createElement("div", { className: "text-[10px] font-bold text-transparent bg-clip-text bg-cover bg-theme-gradient" }, "Details"))),
            react_1["default"].createElement("div", { className: "flex justify-between items-center text-xs" },
                react_1["default"].createElement("div", { className: "pt-1" }, selectedNft.name || '#'.concat(selectedNft.tokenId)),
                react_1["default"].createElement("div", { className: "flex place-items-center" },
                    react_1["default"].createElement("div", { className: "pt-1" },
                        (selectedNft === null || selectedNft === void 0 ? void 0 : selectedNft.price) ? ((selectedNft === null || selectedNft === void 0 ? void 0 : selectedNft.price) / Math.pow(10, 18)).toFixed(1)
                            : '0.0',
                        ' '),
                    selectedNft.chainId == 1 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(EthereumIcon_1["default"], { width: 12, height: 12 }))))))));
};
exports["default"] = CollectionNftCard;
