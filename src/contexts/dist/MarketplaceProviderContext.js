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
var nftUtils_1 = require("@/utils/nftUtils");
var ethers_1 = require("ethers");
var moment_1 = require("moment");
var react_1 = require("react");
var MarketplaceProviderContext = react_1["default"].createContext({});
exports.MarketplaceProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(undefined), userTrades = _b[0], setUserTrades = _b[1];
    var _c = react_1.useState(undefined), userTradesFiltered = _c[0], setUserTradesFiltered = _c[1];
    var _d = react_1.useState({
        marketplace: '',
        contract: ''
    }), tradeFilters = _d[0], setTradeFilters = _d[1];
    var _e = react_1.useState(undefined), activeCollection = _e[0], setActiveCollection = _e[1];
    // const x2y2Token = '38d74028-ca13-48df-ab81-bdfa4f3ab834';
    function getTradesX2Y2(user, contract) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var user_address, contract_address, salesUrl, purchasesUrl, salesRaw, purchasesRaw, sales, purchases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_address = user != undefined ? '=' + user : '';
                        contract_address = contract != undefined ? '=' + contract : '';
                        salesUrl = "/.netlify/functions/getTradesX2Y2?from" + user_address + "&to&contract" + contract_address;
                        purchasesUrl = "/.netlify/functions/getTradesX2Y2?from&to" + user_address + "&contract" + contract_address;
                        return [4 /*yield*/, fetch(salesUrl, { method: 'GET', redirect: 'follow' })];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        salesRaw = _a.sent();
                        return [4 /*yield*/, fetch(purchasesUrl, { method: 'GET', redirect: 'follow' })];
                    case 3: return [4 /*yield*/, (_a.sent()).json()];
                    case 4:
                        purchasesRaw = _a.sent();
                        sales = salesRaw.data.map(function (sale) {
                            return {
                                timestamp: sale.order.updated_at,
                                price: ethers_1.ethers.utils.formatEther(sale.order.price),
                                contract: sale.token.contract,
                                tokenId: sale.token.token_id,
                                txn: sale.tx,
                                marketplace: 'X2Y2'
                            };
                        });
                        purchases = purchasesRaw.data.map(function (purchase) {
                            return {
                                timestamp: purchase.order.updated_at,
                                price: ethers_1.ethers.utils.formatEther(purchase.order.price),
                                contract: purchase.token.contract,
                                tokenId: purchase.token.token_id,
                                txn: purchase.tx,
                                marketplace: 'X2Y2'
                            };
                        });
                        return [2 /*return*/, { sales: sales, purchases: purchases }];
                }
            });
        });
    }
    function getTradesLooksRare(user, contract) {
        var _a, _b;
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var user_address, contract_address, salesUrl, purchasesUrl, salesRaw, purchasesRaw, sales, purchases;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user_address = user != undefined ? '=' + user : '';
                        contract_address = contract && contract.length > 1 ? '&contract=' + contract : '';
                        salesUrl = "/.netlify/functions/getTradesLooksRare?" + (user ? 'from' + user_address : '') + contract_address;
                        purchasesUrl = "/.netlify/functions/getTradesLooksRare?" + (user ? 'to' + user_address : '') + user_address + contract_address;
                        return [4 /*yield*/, fetch(salesUrl, { method: 'GET', redirect: 'follow' })];
                    case 1: return [4 /*yield*/, (_c.sent()).json()];
                    case 2:
                        salesRaw = _c.sent();
                        return [4 /*yield*/, fetch(purchasesUrl, { method: 'GET', redirect: 'follow' })];
                    case 3: return [4 /*yield*/, (_c.sent()).json()];
                    case 4:
                        purchasesRaw = _c.sent();
                        sales = [];
                        purchases = [];
                        if (salesRaw.data) {
                            sales = (_a = salesRaw.data) === null || _a === void 0 ? void 0 : _a.map(function (sale) {
                                return {
                                    timestamp: sale.createdAt,
                                    price: ethers_1.ethers.utils.formatEther(sale.order.price),
                                    contract: sale.collection.address,
                                    tokenId: sale.token.tokenId,
                                    txn: sale.hash,
                                    marketplace: 'LooksRare'
                                };
                            });
                        }
                        if (purchasesRaw.data) {
                            purchases = (_b = purchasesRaw.data) === null || _b === void 0 ? void 0 : _b.map(function (purchase) {
                                return {
                                    timestamp: moment_1["default"](purchase.createdAt).unix(),
                                    price: ethers_1.ethers.utils.formatEther(purchase.order.price),
                                    contract: purchase.collection.address,
                                    tokenId: purchase.token.tokenId,
                                    txn: purchase.hash,
                                    marketplace: 'LooksRare'
                                };
                            });
                        }
                        return [2 /*return*/, { sales: sales, purchases: purchases }];
                }
            });
        });
    }
    function getUserTrades(user, contract) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, x2y2res, looksRes, aggregateTrades;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            getTradesX2Y2(user, contract),
                            getTradesLooksRare(user, contract),
                        ])];
                    case 1:
                        _a = _b.sent(), x2y2res = _a[0], looksRes = _a[1];
                        aggregateTrades = getAggregateTrades(x2y2res, looksRes);
                        setUserTrades(aggregateTrades);
                        applyTradeFilters(aggregateTrades, tradeFilters);
                        return [2 /*return*/];
                }
            });
        });
    }
    function getCollectionTrades(user, contract) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, x2y2res, looksRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            getTradesX2Y2(user, contract),
                            getTradesLooksRare(user, contract),
                        ])];
                    case 1:
                        _a = _b.sent(), x2y2res = _a[0], looksRes = _a[1];
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
    function getAggregateTrades(x2y2res, looksRes) {
        var userSales = [];
        var userPurchases = [];
        if (x2y2res.sales && x2y2res.sales.length > 0)
            userSales = __spreadArrays(userSales, x2y2res.sales);
        if (x2y2res.purchases && x2y2res.purchases.length > 0)
            userPurchases = __spreadArrays(userPurchases, x2y2res.purchases);
        if (looksRes.sales && looksRes.sales.length > 0)
            userSales = __spreadArrays(userSales, looksRes.sales);
        if (looksRes.purchases && looksRes.purchases.length > 0)
            userPurchases = __spreadArrays(userPurchases, looksRes.purchases);
        return { sales: userSales, purchases: userPurchases };
    }
    function getCollectionBySlugOS(slug) {
        return __awaiter(this, void 0, void 0, function () {
            var collectionRaw, nftCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.opensea.io/api/v1/collection/" + slug, {
                            method: 'GET',
                            redirect: 'follow'
                        })];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        collectionRaw = _a.sent();
                        nftCollection = {
                            contractAddress: collectionRaw.collection.primary_asset_contracts[0].address,
                            tokenStandard: collectionRaw.collection.primary_asset_contracts[0].schema_name,
                            description: collectionRaw.collection.description,
                            isVerified: collectionRaw.collection.safelist_request_status == 'verified',
                            image: collectionRaw.collection.image_url,
                            bannerImage: collectionRaw.collection.banner_image_url,
                            slug: collectionRaw.collection.slug,
                            name: collectionRaw.collection.name,
                            chainId: nftUtils_1.NftChainId.ETHEREUM,
                            oneDayVolume: collectionRaw.collection.stats.one_day_volume,
                            oneDaySales: collectionRaw.collection.stats.one_day_sales,
                            oneDayAveragePrice: collectionRaw.collection.stats.one_day_average_price,
                            sevenDayVolume: collectionRaw.collection.stats.seven_day_volume,
                            sevenDaySales: collectionRaw.collection.stats.seven_day_sales,
                            thirtyDaySales: collectionRaw.collection.stats.thirty_day_sales,
                            thirtyDayVolume: collectionRaw.collection.stats.thirty_day_volume,
                            floor: collectionRaw.collection.stats.floor_price,
                            owners: collectionRaw.collection.stats.num_owners,
                            count: collectionRaw.collection.stats.count,
                            supply: collectionRaw.collection.stats.total_supply
                        };
                        setActiveCollection(nftCollection);
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
        getCollectionBySlugOS: getCollectionBySlugOS
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
        getCollectionBySlugOS,
    ]);
    return (react_1["default"].createElement(MarketplaceProviderContext.Provider, { value: contextValue }, children));
};
exports.useMarketplaceProvider = function () {
    return react_1.useContext(MarketplaceProviderContext);
};
