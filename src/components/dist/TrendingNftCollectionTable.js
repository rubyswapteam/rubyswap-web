"use strict";
exports.__esModule = true;
var NftProviderContext_1 = require("@/contexts/NftProviderContext");
var link_1 = require("next/link");
var react_1 = require("react");
var outline_1 = require("@heroicons/react/outline");
var EthereumIcon_1 = require("./EthereumIcon");
function TrendingNftCollectionTable() {
    var _a = NftProviderContext_1.useNftProvider(), trendingNftCollections = _a.trendingNftCollections, fetchAllTrendingNftCollections = _a.fetchAllTrendingNftCollections;
    react_1.useEffect(function () {
        if (!trendingNftCollections) {
            fetchAllTrendingNftCollections();
        }
    }, [trendingNftCollections]);
    return (react_1["default"].createElement("div", { className: "flex flex-col" },
        react_1["default"].createElement("div", { className: "" },
            react_1["default"].createElement("div", { className: "inline-block min-w-full align-middle" },
                react_1["default"].createElement("div", { className: "md:rounded-lg" }, trendingNftCollections && (react_1["default"].createElement("div", { className: "mt-1 flex flex-col" },
                    react_1["default"].createElement("div", { className: "" },
                        react_1["default"].createElement("div", { className: "inline-block min-w-full py-2 align-middle" },
                            react_1["default"].createElement("div", { className: " md:rounded-lg" },
                                react_1["default"].createElement("table", { className: "min-w-full border-separate border-spacing-0" },
                                    react_1["default"].createElement("thead", null,
                                        react_1["default"].createElement("tr", null,
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 w-[5%] top-0 sticky bg-white border-b border-gray-100" }, "\u00A0"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 text-left text-sm text-gray-900 w-[5%] top-0 sticky bg-white border-b border-gray-100" }, "\u00A0"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 w-[25%] top-0 sticky bg-white border-b border-gray-100" }, "Collection"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[15%] top-0 sticky bg-white border-b border-gray-100" }, "Chain"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100" }, "Volume"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100" }, "Floor"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100" }, "Average Price"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100" }, "Sales"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 w-[10%] top-0 sticky bg-white border-b border-gray-100" }, "Owners"))),
                                    react_1["default"].createElement("tbody", { className: "divide-y divide-gray-100 bg-white" }, trendingNftCollections.map(function (nftCollection) {
                                        var _a, _b, _c;
                                        return nftCollection.image && (react_1["default"].createElement(react_1["default"].Fragment, { key: nftCollection.id },
                                            react_1["default"].createElement(link_1["default"], { key: nftCollection.id, href: "/collection/" + nftCollection.slug, prefetch: false },
                                                react_1["default"].createElement("tr", { className: "hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100", key: nftCollection.id },
                                                    react_1["default"].createElement("td", { className: "py-5 pl-4 pr-7 text-sm sm:pl-6" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement(outline_1.StarIcon, { height: 20, width: 20 }))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap py-3 text-sm" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("img", { className: "h-8 w-8 rounded-full", src: nftCollection.image, alt: "" }))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap" },
                                                        react_1["default"].createElement("div", { className: "text-gray-700 flex items-center text-sm font-medium" },
                                                            react_1["default"].createElement("div", { className: "pt-1" }, nftCollection.name),
                                                            nftCollection.isVerified == true && (react_1["default"].createElement("img", { src: "https://www.genie.xyz/svgs/verifiedBadge.svg", className: "ml-1", style: {
                                                                    height: '16px',
                                                                    width: '16px'
                                                                }, alt: "verified badge" })))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700" }, nftCollection.chainId == 1 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 })))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "pt-1" }, (_a = nftCollection.oneDayVolume) === null || _a === void 0 ? void 0 :
                                                                _a.toFixed(2),
                                                                ' '),
                                                            nftCollection.chainId == 1 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                                react_1["default"].createElement("div", { className: "pl-1" },
                                                                    react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 })))))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "flex items-center" },
                                                                react_1["default"].createElement("div", { className: "pt-1" }, (_b = nftCollection.floor) === null || _b === void 0 ? void 0 :
                                                                    _b.toFixed(2),
                                                                    ' '),
                                                                nftCollection.chainId == 1 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                                    react_1["default"].createElement("div", { className: "pl-1" },
                                                                        react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 }))))))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "flex items-center" },
                                                                react_1["default"].createElement("div", { className: "pt-1" }, (_c = nftCollection.oneDayAveragePrice) === null || _c === void 0 ? void 0 :
                                                                    _c.toFixed(2),
                                                                    ' '),
                                                                nftCollection.chainId == 1 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                                    react_1["default"].createElement("div", { className: "pl-1" },
                                                                        react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 }))))))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" }, nftCollection.oneDaySales)),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" }, nftCollection.owners))))));
                                    })))))))))))));
}
exports["default"] = TrendingNftCollectionTable;
