"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var outline_1 = require("@heroicons/react/outline");
var EthereumIcon_1 = require("./EthereumIcon");
var moment_1 = require("moment");
function TrendingNftCollectionTable() {
    var _a = react_1.useState(undefined), fullTrendingCollections = _a[0], setFullTrendingCollections = _a[1];
    var _b = react_1.useState(undefined), trendingCollections = _b[0], setTrendingCollections = _b[1];
    var _c = react_1.useState(0), lastFetch = _c[0], setLastFetch = _c[1];
    react_1.useEffect(function () {
        fetchData();
    }, []);
    var fetchData = function () {
        if (!trendingCollections || lastFetch < moment_1["default"]().unix() - 600) {
            console.log('!trendingCollections');
            console.log(!trendingCollections);
            console.log('lastFetch');
            console.log(lastFetch);
            console.log('lastFetch < moment().unix() - 600');
            console.log(lastFetch < moment_1["default"]().unix() - 600);
            try {
                fetch('/.netlify/functions/getDbTrendingCollections').then(function (res) {
                    return res.json().then(function (result) {
                        setFullTrendingCollections(result);
                        setTrendingCollections(result.filter(function (collection) { return collection.period === 'one_day'; }));
                        setLastFetch(moment_1["default"]().unix());
                        console.log(result);
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col" },
        react_1["default"].createElement("div", { className: "" },
            react_1["default"].createElement("div", { className: "inline-block min-w-full align-middle" },
                react_1["default"].createElement("div", { className: "md:rounded-lg" }, trendingCollections && (react_1["default"].createElement("div", { className: "mt-1 flex flex-col" },
                    react_1["default"].createElement("div", { className: "" },
                        react_1["default"].createElement("div", { className: "inline-block min-w-full py-2 align-middle" },
                            react_1["default"].createElement("div", { className: " md:rounded-lg" },
                                react_1["default"].createElement("table", { className: "min-w-full border-separate border-spacing-0" },
                                    react_1["default"].createElement("thead", null,
                                        react_1["default"].createElement("tr", null,
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 dark:text-white sm:pl-6 w-[5%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "\u00A0"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 text-left text-sm text-gray-900 dark:text-white w-[5%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "\u00A0"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 dark:text-white w-[25%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Collection"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[15%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Chain"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Volume"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Floor"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Average Price"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Sales"),
                                            react_1["default"].createElement("th", { scope: "col", className: "font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky bg-white dark:bg-blackish border-b border-gray-100 dark:border-white/20" }, "Owners"))),
                                    react_1["default"].createElement("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-blackish" }, trendingCollections.map(function (nftCollection) {
                                        var _a, _b, _c;
                                        return nftCollection.imageUrl && (react_1["default"].createElement(react_1["default"].Fragment, { key: nftCollection.index + nftCollection.slug },
                                            react_1["default"].createElement(link_1["default"], { key: nftCollection.id, href: "/collection/" + nftCollection.slug, prefetch: false },
                                                react_1["default"].createElement("tr", { className: "hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors cursor-pointer border-b border-gray-100 dark:border-white/20", key: nftCollection.id },
                                                    react_1["default"].createElement("td", { className: "py-5 pl-4 pr-7 text-sm sm:pl-6" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement(outline_1.StarIcon, { height: 20, width: 20 }))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap py-3 text-sm" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("img", { className: "h-8 w-8 rounded-full", src: nftCollection.imageUrl, alt: "" }))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap" },
                                                        react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 flex items-center text-sm font-medium" },
                                                            react_1["default"].createElement("div", { className: "pt-1" }, nftCollection.name),
                                                            nftCollection.isVerified == true && (react_1["default"].createElement("img", { src: "https://www.genie.xyz/svgs/verifiedBadge.svg", className: "ml-1", style: {
                                                                    height: '16px',
                                                                    width: '16px'
                                                                }, alt: "verified badge" })))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75" },
                                                        react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 })),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "pt-1" }, (_a = nftCollection.osOneDayVolume) === null || _a === void 0 ? void 0 :
                                                                _a.toFixed(2),
                                                                ' '),
                                                            react_1["default"].createElement("div", { className: "pl-1" },
                                                                react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 })))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "flex items-center" },
                                                                react_1["default"].createElement("div", { className: "pt-1" }, (_b = nftCollection.osFloorPrice) === null || _b === void 0 ? void 0 :
                                                                    _b.toFixed(2),
                                                                    ' '),
                                                                react_1["default"].createElement("div", { className: "pl-1" },
                                                                    react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 }))))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" },
                                                            react_1["default"].createElement("div", { className: "flex items-center" },
                                                                react_1["default"].createElement("div", { className: "pt-1" }, (_c = (nftCollection.osOneDayVolume /
                                                                    nftCollection.osOneDaySales)) === null || _c === void 0 ? void 0 :
                                                                    _c.toFixed(2),
                                                                    ' '),
                                                                react_1["default"].createElement("div", { className: "pl-1" },
                                                                    react_1["default"].createElement(EthereumIcon_1["default"], { width: 16, height: 16 }))))),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" }, nftCollection.osOneDaySales)),
                                                    react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-700 dark:text-white/75 circularstdbook" },
                                                        react_1["default"].createElement("div", { className: "flex items-center" }, nftCollection.numOwners))))));
                                    })))))))))))));
}
exports["default"] = TrendingNftCollectionTable;
