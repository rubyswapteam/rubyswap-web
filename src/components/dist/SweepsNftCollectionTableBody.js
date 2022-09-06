"use strict";
exports.__esModule = true;
var nftUtils_1 = require("@/utils/nftUtils");
var moment_1 = require("moment");
var link_1 = require("next/link");
var react_1 = require("react");
var react_infinite_scroll_component_1 = require("react-infinite-scroll-component");
var react_jazzicon_1 = require("react-jazzicon");
var DiscordLogo_1 = require("./DiscordLogo");
var EthereumIcon_1 = require("./EthereumIcon");
var EtherscanLogo_1 = require("./EtherscanLogo");
var SocialsWrapper_1 = require("./SocialsWrapper");
var StarIcon_1 = require("./StarIcon");
var TableProgressBar_1 = require("./TableProgressBar");
var TwitterLogo_1 = require("./TwitterLogo");
var WebsiteIcon_1 = require("./WebsiteIcon");
function SweepsNftCollectionTableBody(props) {
    var _a = react_1.useState(props.data.slice(0, 50)), renderedData = _a[0], setRenderedData = _a[1];
    var _b = react_1.useState(true), hasMore = _b[0], setHasMore = _b[1];
    var newlyMintedTimestamp = react_1.useState(moment_1["default"]().unix() - 60 * 60 * 24 * 7)[0];
    var fetchMoreData = function () {
        var _a;
        if (props.data && renderedData) {
            if (props.data.length > 0 && (renderedData === null || renderedData === void 0 ? void 0 : renderedData.length) >= ((_a = props.data) === null || _a === void 0 ? void 0 : _a.length)) {
                setHasMore(false);
                return renderedData;
            }
            var newRenderedData = Object.assign(renderedData);
            newRenderedData = newRenderedData.concat(props.data.slice(newRenderedData.length, newRenderedData.length + 30));
            setRenderedData(newRenderedData);
            return newRenderedData;
        }
        else {
            return;
        }
    };
    return (react_1["default"].createElement(react_infinite_scroll_component_1["default"], { dataLength: renderedData.length, next: fetchMoreData, hasMore: hasMore, loader: react_1["default"].createElement("h4", null, "Loading..."), height: window.document.body.clientHeight, scrollThreshold: 0.5, scrollableTarget: "scrollableTarget", className: "w-full" }, renderedData.map(function (row) {
        return row.txn && (react_1["default"].createElement(react_1["default"].Fragment, { key: props.keyPrefix +
                row.collections[0] +
                row.index +
                row.slug +
                'fragment' },
            react_1["default"].createElement(link_1["default"], { key: props.keyPrefix + row.address + row.index + row.slug + 'link', href: "/collection/" + (row.slug || row.collections[0]), prefetch: false },
                react_1["default"].createElement("tr", { className: "hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors cursor-pointer flex", key: row.id },
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("td", { className: "py-3 pl-4 pr-7 text-sm sm:pl-6 w-[5%] self-center" },
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement(StarIcon_1["default"], null))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap py-3 text-sm w-[5%] self-center" },
                            react_1["default"].createElement("div", { className: "flex items-center" }, row.imageUrl || row.collectionImageUrl ? (react_1["default"].createElement("img", { className: "h-8 w-8 rounded-full", src: (row === null || row === void 0 ? void 0 : row.imageUrl) || (row === null || row === void 0 ? void 0 : row.collectionImageUrl), alt: "" })) : (react_1["default"].createElement(react_jazzicon_1["default"], { diameter: 28, seed: react_jazzicon_1.jsNumberForAddress(row.buyer) })))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[20%] self-center lg:flex" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium" },
                                react_1["default"].createElement("div", { className: "pt-1 whitespace-normal" }, row.name || row.collectionName),
                                react_1["default"].createElement("div", { className: "text-xs dark:text-white/60" }, nftUtils_1.trimHex(row.contractAddress || row.collections[0]))),
                            row.firstmint && row.firstmint > newlyMintedTimestamp && (react_1["default"].createElement("div", { className: "h-min self-center bg-gradient-to-r from-green-600 to-green-600/10 hover:to-green-600/50 ml-2 px-2 py-0.5 rounded-lg text-xs", onClick: function (event) {
                                    event.stopPropagation();
                                } }, "New Mint"))),
                        react_1["default"].createElement("td", { className: "whitespace-normal flex-wrap gap-y-2 px-3 py-3 text-sm font-medium text-gray-700 dark:text-white/75 w-[10%] self-center flex gap-x-2" },
                            react_1["default"].createElement(SocialsWrapper_1["default"], { link: (row.contractAddress || row.collections[0]) &&
                                    "https://etherscan.io/address/" + (row.contractAddress || row.collections[0]) },
                                react_1["default"].createElement(EtherscanLogo_1["default"], null)),
                            react_1["default"].createElement(SocialsWrapper_1["default"], { link: row.website },
                                react_1["default"].createElement(WebsiteIcon_1["default"], null)),
                            react_1["default"].createElement(SocialsWrapper_1["default"], { link: row.discordUrl },
                                react_1["default"].createElement(DiscordLogo_1["default"], null)),
                            react_1["default"].createElement(SocialsWrapper_1["default"], { link: row.twitterUsername &&
                                    "https://twitter.com/" + row.twitterUsername },
                                react_1["default"].createElement(TwitterLogo_1["default"], null))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[10%] px-3 py-3 self-center" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium" },
                                react_1["default"].createElement("div", { className: "pt-1 whitespace-normal" },
                                    row.numItems + ' items',
                                    react_1["default"].createElement("div", { className: "text-xs flex" },
                                        react_1["default"].createElement("div", { className: "" }, Math.floor(row.cost * 1000) / 1000),
                                        react_1["default"].createElement("div", { className: "pl-0.5" },
                                            react_1["default"].createElement(EthereumIcon_1["default"], { width: 12, height: 12 })))))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[10%] px-3 py-3 self-center" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium lg: flex" },
                                react_1["default"].createElement(react_jazzicon_1["default"], { diameter: 20, seed: react_jazzicon_1.jsNumberForAddress(row.buyer) }),
                                react_1["default"].createElement("div", { className: "pt-1 lg:pl-1 whitespace-normal hover:text-yellow-300/90" }, nftUtils_1.trimHex(row.buyer, 4)))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[10%] px-3 py-3 self-center" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium" },
                                react_1["default"].createElement("div", { className: "pt-1 whitespace-normal" }, row.numOwners),
                                react_1["default"].createElement(TableProgressBar_1["default"], { value: row.numOwners, maxValue: row === null || row === void 0 ? void 0 : row.totalSupply }))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[10%] px-3 py-3 self-center" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium" },
                                react_1["default"].createElement("div", { className: "pt-1 whitespace-normal" }, row.txnTime
                                    ? moment_1["default"].unix(row.txnTime).fromNow()
                                    : '-'))),
                        react_1["default"].createElement("td", { className: "whitespace-nowrap w-[20%] px-3 py-3 self-center" },
                            react_1["default"].createElement("div", { className: "text-gray-700 dark:text-white/90 block items-center text-sm font-medium" },
                                react_1["default"].createElement("button", { className: "hover:bg-white/5 border-white/50 border bg-purple/30  dark:hover:bg-purple/20 px-1.5 py-1 rounded-lg", onClick: function (event) { return event.stopPropagation(); } }, "Details"),
                                react_1["default"].createElement("div", { className: "inline-block" },
                                    react_1["default"].createElement(SocialsWrapper_1["default"], { link: row.txn && "https://etherscan.io/tx/" + row.txn },
                                        react_1["default"].createElement("button", { className: "hover:bg-black/10 bg-black/20 dark:bg-white/20  dark:hover:bg-white/10 px-1.5 py-1 rounded-lg ml-2", onClick: function (event) { return event.stopPropagation(); } }, "Etherscan"))),
                                react_1["default"].createElement(link_1["default"], { href: "/collection/" + row.slug + "?tab=listings" },
                                    react_1["default"].createElement("button", { className: "hover:bg-black/20 bg-blue-600/50 dark:hover:bg-blue-600/40 px-1.5 py-1 rounded-lg ml-2", onClick: function (event) { return event.stopPropagation(); } }, "Listings")))))))));
    })));
}
exports["default"] = SweepsNftCollectionTableBody;
