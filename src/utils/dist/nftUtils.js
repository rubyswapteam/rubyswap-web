"use strict";
exports.__esModule = true;
exports.rangeTabs = exports.getTrimmedAddressEllipsisMiddle = exports.rangeMapping = exports.NftChainId = exports.NftMarketplace = void 0;
var NftMarketplace;
(function (NftMarketplace) {
    NftMarketplace["NFTRADE"] = "nftrade";
    NftMarketplace["OPENSEA"] = "opensea";
    NftMarketplace["LOOKSRARE"] = "looksrare";
    NftMarketplace["SEAPORT"] = "seaport";
    NftMarketplace["X2Y2"] = "x2y2";
})(NftMarketplace = exports.NftMarketplace || (exports.NftMarketplace = {}));
var NftChainId;
(function (NftChainId) {
    NftChainId[NftChainId["ETHEREUM"] = 1] = "ETHEREUM";
    NftChainId[NftChainId["BINANCE_SMART_CHAIN"] = 56] = "BINANCE_SMART_CHAIN";
    NftChainId[NftChainId["AVALANCHE"] = 43114] = "AVALANCHE";
})(NftChainId = exports.NftChainId || (exports.NftChainId = {}));
exports.rangeMapping = {
    '5m': '5 minutes',
    '15m': '15 minutes',
    '30m': '30 minutes',
    '1h': '1 hour',
    '6h': '6 hour',
    '24h': '24 hour',
    '7d': '7 day',
    '30d': '30 day'
};
function getTrimmedAddressEllipsisMiddle(val, length) {
    if (!val)
        return '...';
    if (length) {
        return (val.substring(0, length - 1) +
            '...' +
            val.substring(val.length - 4, val.length));
    }
    return (val.substring(0, 5) + '...' + val.substring(val.length - 4, val.length));
}
exports.getTrimmedAddressEllipsisMiddle = getTrimmedAddressEllipsisMiddle;
exports.rangeTabs = function (tab, range, route) {
    var tabObj = [];
    ['5m', '15m', '30m', '1h', '6h', '24h', '7d', '30d'].forEach(function (rng) {
        var activeHref = getRangeHref(tab, rng, route);
        var activeTab = {
            name: rng,
            href: activeHref,
            current: range == rng || (rng == '24h' && range == undefined)
        };
        tabObj.push(activeTab);
    });
    return tabObj;
};
function getRangeHref(tab, range, route) {
    var baseRoute = route || '';
    var tabSuffix = tab ? "tab=" + tab : '';
    var rangeSuffix = range && range !== '24h' ? "range=" + range : '';
    var baseSuffix = tabSuffix || rangeSuffix ? '?' : '';
    var conjunction = tabSuffix && rangeSuffix ? '&' : '';
    return "" + baseRoute + baseSuffix + tabSuffix + conjunction + rangeSuffix;
}
