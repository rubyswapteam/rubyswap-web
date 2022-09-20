"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useMarketplaceProvider = exports.MarketplaceProvider = void 0;
var moment_1 = require("moment");
var react_1 = require("react");
var MarketplaceProviderContext = react_1["default"].createContext({});
exports.MarketplaceProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(undefined), userTrades = _b[0], setUserTrades = _b[1];
    var _c = react_1.useState(undefined), collectionTrades = _c[0], setCollectionTrades = _c[1];
    var _d = react_1.useState(undefined), userTradesFiltered = _d[0], setUserTradesFiltered = _d[1];
    var _e = react_1.useState(undefined), recentTrades = _e[0], setRecentTrades = _e[1];
    var _f = react_1.useState({
        marketplace: '',
        contract: ''
    }), tradeFilters = _f[0], setTradeFilters = _f[1];
    var _g = react_1.useState(undefined), activeCollection = _g[0], setActiveCollection = _g[1];
    var _h = react_1.useState(undefined), tokenRanks = _h[0], setTokenRanks = _h[1];
    var _j = react_1.useState(), activeListings = _j[0], setActiveListings = _j[1];
    var _k = react_1.useState(0), totalListings = _k[0], setTotalListings = _k[1];
    var marketplaces = react_1.useState(['Opensea', 'Seaport', 'X2Y2', 'LooksRare'])[0];
    function fetchGet(url) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, { method: 'GET', redirect: 'follow' })];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    function mapTrades(obj, marketplace) {
        var _a, _b;
        return (_b = (_a = obj[marketplace]) === null || _a === void 0 ? void 0 : _a.trades) === null || _b === void 0 ? void 0 : _b.map(function (trade) {
            var _a;
            return ({
                timestamp: parseInt(trade.timestamp),
                price: parseFloat(trade.priceETH),
                contract: ((_a = trade === null || trade === void 0 ? void 0 : trade.collection) === null || _a === void 0 ? void 0 : _a.id) || 'unknown',
                tokenId: trade.tokenId.toString(),
                txn: trade.transactionHash.toString(),
                marketplace: marketplace,
                from: (trade === null || trade === void 0 ? void 0 : trade.seller) || '',
                to: (trade === null || trade === void 0 ? void 0 : trade.buyer) || '',
                chainId: 1
            });
        });
    }
    function getTrades(user, contract, includeMints) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        if (includeMints === void 0) { includeMints = false; }
        return __awaiter(this, void 0, void 0, function () {
            var user_address, contract_address, salesUrl, purchasesUrl, salesRaw, purchasesRaw, sales, purchases, i, marketplace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_address = user != undefined ? '=' + user : '';
                        contract_address = contract && contract.length > 1 ? '&contract=' + contract : '';
                        salesUrl = "/.netlify/functions/getTrades?order=desc&from" + user_address + contract_address;
                        purchasesUrl = "/.netlify/functions/getTrades?order=desc&to" + user_address + contract_address;
                        return [4 /*yield*/, fetchGet(salesUrl)];
                    case 1:
                        salesRaw = _a.sent();
                        return [4 /*yield*/, fetchGet(purchasesUrl)];
                    case 2:
                        purchasesRaw = _a.sent();
                        sales = [];
                        purchases = [];
                        for (i = 0; i < marketplaces.length; i++) {
                            marketplace = marketplaces[i];
                            if (salesRaw && salesRaw)
                                sales = __spreadArrays(sales, mapTrades(salesRaw, marketplace));
                            if (purchasesRaw)
                                purchases = __spreadArrays(purchases, mapTrades(purchasesRaw, marketplace));
                        }
                        return [2 /*return*/, { sales: sales, purchases: purchases }];
                }
            });
        });
    }
    function fetchCollectionTrades(contract, baseTimeFilter) {
        var _a, _b, _c;
        if (contract === void 0) { contract = ''; }
        if (baseTimeFilter === void 0) { baseTimeFilter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var contract_address, repeat, adj, finalResult, res, resArr, marketplaces_1, i, marketplace, mappedTrades;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        contract_address = !!contract && contract.length > 1 ? contract : undefined;
                        repeat = false;
                        if (!contract_address)
                            return [2 /*return*/];
                        adj = baseTimeFilter;
                        finalResult = [];
                        _d.label = 1;
                    case 1: return [4 /*yield*/, fetchGet("/.netlify/functions/getTrades?contract=" + contract_address + adj)];
                    case 2:
                        res = _d.sent();
                        resArr = [];
                        marketplaces_1 = Object.keys(res);
                        repeat = false;
                        adj = '';
                        for (i = 0; i < marketplaces_1.length; i++) {
                            marketplace = marketplaces_1[i];
                            mappedTrades = mapTrades(res, marketplace);
                            if (mappedTrades) {
                                resArr = __spreadArrays(resArr, mappedTrades);
                            }
                            repeat = repeat || !!((_a = res[marketplace]) === null || _a === void 0 ? void 0 : _a.last);
                            adj =
                                adj +
                                    (((_b = res[marketplace]) === null || _b === void 0 ? void 0 : _b.last) ? "&" + marketplace + "=" + ((_c = res[marketplace]) === null || _c === void 0 ? void 0 : _c.last.timestamp)
                                        : "&" + marketplace + "=0");
                        }
                        finalResult = __spreadArrays(finalResult, resArr);
                        _d.label = 3;
                    case 3:
                        if (repeat) return [3 /*break*/, 1];
                        _d.label = 4;
                    case 4: return [2 /*return*/, finalResult];
                }
            });
        });
    }
    function getUserTrades(user, contract) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getTrades(user, contract)];
                    case 1:
                        trades = _a.sent();
                        setUserTrades(trades);
                        applyTradeFilters(trades, tradeFilters);
                        return [2 /*return*/];
                }
            });
        });
    }
    function getCollectionTradesfromDb(contractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/.netlify/functions/getDbTradesByContract?contract=" + contractAddress, {
                            method: 'GET',
                            redirect: 'follow'
                        })];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        collection = _a.sent();
                        return [2 /*return*/, collection];
                }
            });
        });
    }
    function getTokenRanks(contract, slug) {
        if (contract === void 0) { contract = ''; }
        if (slug === void 0) { slug = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var suffix, ranks, contract_1, tokenRanks_1, supply, tiers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suffix = contract ? "contract=" + contract : "slug=" + slug;
                        return [4 /*yield*/, fetch("/.netlify/functions/getDbRarity?" + suffix, {
                                method: 'GET',
                                redirect: 'follow'
                            })];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        ranks = _a.sent();
                        if (ranks && (ranks === null || ranks === void 0 ? void 0 : ranks.length) == 1) {
                            contract_1 = ranks[0].contractAddress;
                            tokenRanks_1 = JSON.parse(ranks[0].ranks);
                            supply = Object.keys(tokenRanks_1).length;
                            tiers = [
                                Math.floor(supply / 100),
                                Math.floor(supply / 10),
                                Math.floor(supply / 2),
                            ];
                            setTokenRanks({ contract: contract_1, ranks: tokenRanks_1, tiers: tiers });
                        }
                        else {
                            setTokenRanks(undefined);
                        }
                        return [2 /*return*/, ranks];
                }
            });
        });
    }
    function getBasetimeByMarketplace(trades) {
        var unixNow = moment_1["default"]().unix() - 60 * 60 * 24 * 30;
        var baseTimeFilter = '';
        var _loop_1 = function (i) {
            var marketplace = marketplaces[i];
            var basetime = Math.max(Math.max.apply(Math, trades
                .filter(function (txn) { return txn.marketplace == marketplace; })
                .map(function (txn) { return txn.timestamp; })), unixNow);
            baseTimeFilter = baseTimeFilter + ("&" + marketplace + "=" + basetime);
        };
        for (var i = 0; i < marketplaces.length; i++) {
            _loop_1(i);
        }
        return baseTimeFilter;
    }
    function getCollectionTrades(collection) {
        var _a, _b;
        if (collection === void 0) { collection = activeCollection === null || activeCollection === void 0 ? void 0 : activeCollection.contractAddress; }
        return __awaiter(this, void 0, void 0, function () {
            var dbTrades, baseTimeFilter, newTrades, recentTrades, i, trade, url, tokenMetadata, dbPostUrl, promiseArray, index, size, loopLimit, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!collection)
                            return [2 /*return*/];
                        return [4 /*yield*/, getCollectionTradesfromDb(collection)];
                    case 1:
                        dbTrades = _c.sent();
                        if (!Array.isArray(dbTrades))
                            dbTrades = [];
                        baseTimeFilter = getBasetimeByMarketplace(dbTrades);
                        return [4 /*yield*/, fetchCollectionTrades(collection, baseTimeFilter)];
                    case 2:
                        newTrades = _c.sent();
                        newTrades = newTrades.filter(function (y) {
                            return !dbTrades.some(function (x) {
                                return ['txn', 'tokenId', 'contract', 'from', 'to', 'price'].every(function (key) { return x[key] == y[key]; });
                            });
                        });
                        //remove duplicates
                        newTrades = newTrades.filter(function (elem, index, self) {
                            return self.findIndex(function (t) {
                                return t.txn == elem.txn &&
                                    t.price == elem.price &&
                                    t.tokenId == elem.tokenId &&
                                    t.contract == elem.contract &&
                                    t.from == elem.from &&
                                    t.to == elem.to;
                            }) === index;
                        });
                        if (newTrades)
                            dbTrades = __spreadArrays(dbTrades, newTrades);
                        setCollectionTrades(dbTrades);
                        recentTrades = __spreadArrays(dbTrades).sort(function (a, b) { return a.timestamp - b.timestamp; })
                            .slice(-6);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < recentTrades.length)) return [3 /*break*/, 7];
                        trade = recentTrades[i];
                        if (!!trade.image) return [3 /*break*/, 6];
                        url = "/.netlify/functions/getNftLooksRare?contract=" + trade.contract + "&tokenId=" + trade.tokenId;
                        return [4 /*yield*/, fetch(url, { method: 'GET', redirect: 'follow' })];
                    case 4: return [4 /*yield*/, (_c.sent()).json()];
                    case 5:
                        tokenMetadata = _c.sent();
                        recentTrades[i] = __assign(__assign({}, trade), {
                            image: (_a = tokenMetadata.data) === null || _a === void 0 ? void 0 : _a.imageURI,
                            name: (_b = tokenMetadata.data) === null || _b === void 0 ? void 0 : _b.name
                        });
                        _c.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        setRecentTrades(__spreadArrays(recentTrades));
                        dbPostUrl = '/.netlify/functions/postHistoricalTradesToDb';
                        promiseArray = [];
                        index = 0;
                        size = 1000;
                        loopLimit = newTrades.length / size + 1;
                        for (i = 0; i < loopLimit; i++) {
                            promiseArray.push(fetch(dbPostUrl, {
                                method: 'POST',
                                body: JSON.stringify(newTrades.slice(index, index + size)),
                                redirect: 'follow'
                            }));
                            index += size;
                        }
                        return [4 /*yield*/, Promise.all(promiseArray)];
                    case 8:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function applyTradeFilters(trades, newFilter) {
        trades = typeof trades !== 'undefined' ? trades : __assign({}, userTrades);
        newFilter =
            typeof newFilter !== 'undefined' ? newFilter : __assign({}, tradeFilters);
        var filters = __assign(__assign({}, tradeFilters), newFilter);
        setTradeFilters(filters);
        if (filters.marketplace == '' && filters.contract == '') {
            setUserTradesFiltered(undefined);
        }
        else {
            var sales = trades.sales;
            var purchases = trades.purchases;
            sales = applyTradeFilter(sales, 'contract', filters);
            sales = applyTradeFilter(sales, 'marketplace', filters);
            purchases = applyTradeFilter(purchases, 'contract', filters);
            purchases = applyTradeFilter(purchases, 'marketplace', filters);
            setUserTradesFiltered({ sales: sales, purchases: purchases });
        }
    }
    function applyTradeFilter(obj, field, filters) {
        return filters[field] !== ''
            ? obj.filter(function (order) { return order[field] === filters[field]; })
            : obj;
    }
    function getAggregateTrades(arr) {
        var userSales = [];
        var userPurchases = [];
        for (var i = 0; i < arr.length; i++) {
            var res = arr[i];
            if (res.sales && res.sales.length > 0)
                userSales = __spreadArrays(userSales, res.sales);
            if (res.purchases && res.purchases.length > 0)
                userPurchases = __spreadArrays(userPurchases, res.purchases);
        }
        return { sales: userSales, purchases: userPurchases };
    }
    function fetchActiveListings(contractAddress, limit, offset) {
        if (limit === void 0) { limit = 1000; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var listings, listingsRaw, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        listings = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('/.netlify/functions/getListings', {
                                method: 'POST',
                                body: JSON.stringify({
                                    contractAddress: contractAddress,
                                    offset: offset,
                                    limit: limit
                                })
                            })];
                    case 2:
                        listingsRaw = _b.sent();
                        return [4 /*yield*/, listingsRaw.json()];
                    case 3:
                        listings = _b.sent();
                        setTotalListings(listings.total);
                        listings = listings.data.map(function (item) {
                            return {
                                timestamp: item.orderCreatedAt,
                                price: (item.currentEthPrice * Math.pow(10, -18)).toFixed(3),
                                contract: item.address,
                                tokenId: item.id,
                                txn: undefined,
                                marketplace: item.market || item.marketplace,
                                looksRareId: undefined,
                                from: item.owner,
                                to: undefined,
                                chainId: 1,
                                image: item.imageUrl,
                                name: item.name,
                                traits: item.traits,
                                rarityScore: item.rarityScore,
                                pendingTxns: item === null || item === void 0 ? void 0 : item.pendingTrxs
                            };
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        listings = {};
                        return [3 /*break*/, 5];
                    case 5:
                        setActiveListings(listings);
                        return [2 /*return*/, listings];
                }
            });
        });
    }
    function fetchCollectionFromDb(query) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        collection = {};
                        url = query.toLowerCase().startsWith('0x')
                            ? "/.netlify/functions/getDbCollectionByContract?contract=" + query
                            : "/.netlify/functions/getDbCollectionBySlug?slug=" + query;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                redirect: 'follow'
                            })];
                    case 2: return [4 /*yield*/, (_b.sent()).json()];
                    case 3:
                        collection = (_b.sent())[0];
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        collection = false;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, collection];
                }
            });
        });
    }
    function getCollection(query, getTrades, setActive, persist) {
        if (query === void 0) { query = ''; }
        if (getTrades === void 0) { getTrades = false; }
        if (setActive === void 0) { setActive = true; }
        if (persist === void 0) { persist = false; }
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query || query.length < 3 || query === undefined || query == '')
                            return [2 /*return*/, false];
                        collection = undefined;
                        return [4 /*yield*/, fetchCollectionFromDb(query)];
                    case 1:
                        collection = _a.sent();
                        if (collection && (collection === null || collection === void 0 ? void 0 : collection.contractAddress)) {
                            if (setActive)
                                setActiveCollection(collection);
                            if (getTrades) {
                                getCollectionTrades(collection.contractAddress);
                            }
                            return [2 /*return*/, collection];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    var contextValue = react_1.useMemo(function () { return ({
        userTrades: userTrades,
        setUserTrades: setUserTrades,
        getUserTrades: getUserTrades,
        tradeFilters: tradeFilters,
        setTradeFilters: setTradeFilters,
        applyTradeFilters: applyTradeFilters,
        userTradesFiltered: userTradesFiltered,
        setUserTradesFiltered: setUserTradesFiltered,
        activeCollection: activeCollection,
        getCollection: getCollection,
        collectionTrades: collectionTrades,
        getCollectionTrades: getCollectionTrades,
        recentTrades: recentTrades,
        fetchActiveListings: fetchActiveListings,
        activeListings: activeListings,
        totalListings: totalListings,
        getTokenRanks: getTokenRanks,
        tokenRanks: tokenRanks
    }); }, [
        userTrades,
        setUserTrades,
        getUserTrades,
        tradeFilters,
        setTradeFilters,
        applyTradeFilters,
        userTradesFiltered,
        setUserTradesFiltered,
        activeCollection,
        getCollection,
        collectionTrades,
        getCollectionTrades,
        recentTrades,
        fetchActiveListings,
        activeListings,
        totalListings,
        getTokenRanks,
        tokenRanks,
    ]);
    return (react_1["default"].createElement(MarketplaceProviderContext.Provider, { value: contextValue }, children));
};
exports.useMarketplaceProvider = function () {
    return react_1.useContext(MarketplaceProviderContext);
};
