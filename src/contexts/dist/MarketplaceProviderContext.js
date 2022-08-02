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
    var _c = react_1.useState(undefined), collectionTrades = _c[0], setCollectionTrades = _c[1];
    var _d = react_1.useState(undefined), userTradesFiltered = _d[0], setUserTradesFiltered = _d[1];
    var _e = react_1.useState(undefined), recentTrades = _e[0], setRecentTrades = _e[1];
    var _f = react_1.useState({
        marketplace: '',
        contract: ''
    }), tradeFilters = _f[0], setTradeFilters = _f[1];
    var _g = react_1.useState(undefined), activeCollection = _g[0], setActiveCollection = _g[1];
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
    function getCollectionTradesX2Y2(contract, lastTxn) {
        if (contract === void 0) { contract = ''; }
        if (lastTxn === void 0) { lastTxn = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var contract_address, cursor, createdAfter, resArr, isFinished, url, res, filteredResultArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract_address = !!contract && contract.length > 1 ? contract : undefined;
                        if (!contract_address)
                            return [2 /*return*/];
                        cursor = '';
                        console.log('createdAfter');
                        console.log(!!lastTxn && !!(lastTxn === null || lastTxn === void 0 ? void 0 : lastTxn.timestamp));
                        createdAfter = !!lastTxn && !!(lastTxn === null || lastTxn === void 0 ? void 0 : lastTxn.timestamp)
                            ? '&createdAfter=' + lastTxn.timestamp
                            : '';
                        resArr = [];
                        isFinished = false;
                        _a.label = 1;
                    case 1:
                        console.log('x2y2LoopStart');
                        url = "/.netlify/functions/getTradesX2Y2?contract=" + contract_address + cursor + createdAfter;
                        return [4 /*yield*/, fetch(url, { method: 'GET', redirect: 'follow' })];
                    case 2: return [4 /*yield*/, (_a.sent()).json()];
                    case 3:
                        res = _a.sent();
                        if (!res.data)
                            return [2 /*return*/, resArr];
                        filteredResultArray = [];
                        filteredResultArray = res.data.map(function (trade) {
                            return {
                                timestamp: parseInt(trade.order.updated_at),
                                price: parseFloat(ethers_1.ethers.utils.formatEther(trade.order.price)),
                                contract: trade.token.contract,
                                tokenId: trade.token.token_id.toString(),
                                txn: trade.tx,
                                marketplace: 'X2Y2',
                                looksRareId: null,
                                from: trade.from_address,
                                to: trade.to_address,
                                chainId: 1
                            };
                        });
                        resArr = __spreadArrays(resArr, filteredResultArray);
                        console.log(res);
                        console.log(res.next && res.next.length > 1);
                        if (res.next && res.next.length > 1) {
                            cursor = '&cursor=' + res.next;
                        }
                        else {
                            isFinished = true;
                        }
                        _a.label = 4;
                    case 4:
                        if (!isFinished) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/, resArr];
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
                        salesUrl = "/.netlify/functions/getTradesLooksRare?from" + user_address + contract_address;
                        purchasesUrl = "/.netlify/functions/getTradesLooksRare?to" + user_address + contract_address;
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
                                    timestamp: moment_1["default"](sale.createdAt).unix(),
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
    function getCollectionTradesLooksRare(contract, lastTxn) {
        var _a, _b, _c;
        if (contract === void 0) { contract = ''; }
        if (lastTxn === void 0) { lastTxn = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var contract_address, isFinished, resArr, cursor, url, res, filteredResultArray;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        contract_address = !!contract && contract.length > 1 ? contract : undefined;
                        if (!contract_address)
                            return [2 /*return*/];
                        isFinished = false;
                        resArr = [];
                        cursor = lastTxn && lastTxn.looksRareId
                            ? '&pagination[cursor]=' + lastTxn.looksRareId
                            : '';
                        _d.label = 1;
                    case 1:
                        console.log('looksLoopStart');
                        url = "/.netlify/functions/getTradesLooksRare?contract=" + contract_address + cursor;
                        return [4 /*yield*/, fetch(url, { method: 'GET', redirect: 'follow' })];
                    case 2: return [4 /*yield*/, (_d.sent()).json()];
                    case 3:
                        res = _d.sent();
                        filteredResultArray = [];
                        if (!res.data)
                            return [2 /*return*/, resArr];
                        filteredResultArray = (_a = res.data) === null || _a === void 0 ? void 0 : _a.map(function (trade) {
                            return {
                                timestamp: moment_1["default"](trade.createdAt).unix(),
                                price: parseFloat(ethers_1.ethers.utils.formatEther(trade.order.price)),
                                contract: trade.collection.address,
                                tokenId: trade.token.tokenId.toString(),
                                txn: trade.hash,
                                marketplace: 'LooksRare',
                                looksRareId: parseInt(trade.id),
                                from: trade.from,
                                to: trade.to,
                                chainId: 1
                            };
                        });
                        resArr = __spreadArrays(resArr, filteredResultArray);
                        console.log(res.data);
                        console.log(!!((_b = res.data[0]) === null || _b === void 0 ? void 0 : _b.id));
                        if (!!((_c = res.data[0]) === null || _c === void 0 ? void 0 : _c.id) && filteredResultArray.length < 150) {
                            cursor = '&cursor=' + res.data[res.data.length - 1].id;
                        }
                        else {
                            isFinished = true;
                        }
                        _d.label = 4;
                    case 4:
                        if (!isFinished) return [3 /*break*/, 1];
                        _d.label = 5;
                    case 5: return [2 /*return*/, resArr];
                }
            });
        });
    }
    function getUserTrades(user, contract) {
        if (user === void 0) { user = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var x2y2res, looksRes, aggregateTrades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getTradesX2Y2(user, contract)];
                    case 1:
                        x2y2res = _a.sent();
                        return [4 /*yield*/, getTradesLooksRare(user, contract)];
                    case 2:
                        looksRes = _a.sent();
                        aggregateTrades = getAggregateTrades(x2y2res, looksRes);
                        setUserTrades(aggregateTrades);
                        applyTradeFilters(aggregateTrades, tradeFilters);
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
    function getCollectionTrades(collection) {
        var _a, _b;
        if (collection === void 0) { collection = activeCollection === null || activeCollection === void 0 ? void 0 : activeCollection.contractAddress; }
        return __awaiter(this, void 0, void 0, function () {
            var dbTrades, maxValues, _c, x2y2res, looksRes, newTrades, recentTrades, i, trade, url, tokenMetadata, dbPostUrl, promiseArray, index, size, loopLimit, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!collection)
                            return [2 /*return*/];
                        return [4 /*yield*/, getCollectionTradesfromDb(collection)];
                    case 1:
                        dbTrades = _d.sent();
                        if (!Array.isArray(dbTrades))
                            dbTrades = [];
                        console.log('dbTrades');
                        console.log(dbTrades);
                        maxValues = {
                            LooksRare: { timestamp: 0, looksRareId: 0 },
                            X2Y2: { timestamp: 0 }
                        };
                        if (dbTrades.length > 0) {
                            maxValues = dbTrades.reduce(function (prev, current) {
                                var _a;
                                return prev[current.marketplace].timestamp > current.timestamp
                                    ? prev
                                    : __assign(__assign({}, prev), (_a = {}, _a[current.marketplace] = current, _a));
                            }, { LooksRare: { timestamp: 0, looksRareId: 0 }, X2Y2: { timestamp: 0 } });
                            console.log(maxValues);
                        }
                        return [4 /*yield*/, Promise.all([
                                getCollectionTradesX2Y2(collection, maxValues.X2Y2),
                                getCollectionTradesLooksRare(collection, maxValues.LooksRare),
                            ])];
                    case 2:
                        _c = _d.sent(), x2y2res = _c[0], looksRes = _c[1];
                        console.log('dbTrades');
                        console.log(dbTrades);
                        console.log('x2y2res');
                        console.log(x2y2res);
                        console.log('looksRes');
                        console.log(looksRes);
                        newTrades = [];
                        if (x2y2res)
                            newTrades = __spreadArrays(newTrades, x2y2res);
                        if (looksRes)
                            newTrades = __spreadArrays(newTrades, looksRes);
                        console.log('newTrades');
                        newTrades = newTrades.filter(function (y) {
                            return !dbTrades.some(function (x) {
                                return ['txn', 'tokenId', 'contract'].every(function (key) { return x[key] == y[key]; });
                            });
                        });
                        console.log(newTrades);
                        if (newTrades)
                            dbTrades = __spreadArrays(dbTrades, newTrades);
                        setCollectionTrades(dbTrades);
                        recentTrades = dbTrades
                            .sort(function (a, b) { return a.timestamp - b.timestamp; })
                            .slice(-10);
                        i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(i < recentTrades.length)) return [3 /*break*/, 7];
                        trade = recentTrades[i];
                        if (!!trade.image) return [3 /*break*/, 6];
                        url = "/.netlify/functions/getNftLooksRare?contract=" + trade.contract + "&tokenId=" + trade.tokenId;
                        return [4 /*yield*/, fetch(url, { method: 'GET', redirect: 'follow' })];
                    case 4: return [4 /*yield*/, (_d.sent()).json()];
                    case 5:
                        tokenMetadata = _d.sent();
                        recentTrades[i] = __assign(__assign({}, trade), {
                            image: (_a = tokenMetadata.data) === null || _a === void 0 ? void 0 : _a.imageURI,
                            name: (_b = tokenMetadata.data) === null || _b === void 0 ? void 0 : _b.name
                        });
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        setRecentTrades(recentTrades);
                        dbPostUrl = '/.netlify/functions/postHistoricalTradesToDb';
                        promiseArray = [];
                        index = 0;
                        size = 100;
                        loopLimit = newTrades.length / size + 1;
                        for (i = 0; i < loopLimit; i++) {
                            console.log(newTrades.slice(index, index + size));
                            promiseArray.push(fetch(dbPostUrl, {
                                method: 'POST',
                                body: JSON.stringify(newTrades.slice(index, index + size)),
                                redirect: 'follow'
                            }));
                            index += size;
                        }
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
    function fetchCollectionFromDb(slug) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        collection = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("/.netlify/functions/getDbCollectionBySlug?slug=" + slug, {
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
    function getCollectionBySlug(slug, getTrades, setActive, persist) {
        if (slug === void 0) { slug = ''; }
        if (getTrades === void 0) { getTrades = false; }
        if (setActive === void 0) { setActive = true; }
        if (persist === void 0) { persist = false; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, isStored, collectionRaw, dbPostUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!slug || slug.length < 3 || slug === undefined || slug == '')
                            return [2 /*return*/, false];
                        return [4 /*yield*/, fetchCollectionFromDb(slug)];
                    case 1:
                        collection = _b.sent();
                        isStored = collection && collection.contractAddress;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        if (!!isStored) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("https://api.opensea.io/api/v1/collection/" + slug, {
                                method: 'GET',
                                redirect: 'follow'
                            })];
                    case 3: return [4 /*yield*/, (_b.sent()).json()];
                    case 4:
                        collectionRaw = _b.sent();
                        if (slug.length > 1 && collectionRaw && collectionRaw.collection) {
                            collection = {
                                contractAddress: collectionRaw.collection.primary_asset_contracts[0].address,
                                editors: collectionRaw.collection.editors,
                                slug: collectionRaw.collection.slug,
                                imageUrl: collectionRaw.collection.image_url,
                                largeImageUrl: collectionRaw.collection.large_image_url,
                                bannerImageUrl: collectionRaw.collection.banner_image_url,
                                schemaName: collectionRaw.collection.primary_asset_contracts[0].schema_name,
                                description: collectionRaw.collection.description,
                                osVerificationState: collectionRaw.collection.safelist_request_status == 'verified',
                                name: collectionRaw.collection.name,
                                website: collectionRaw.collection.external_url,
                                discordUrl: collectionRaw.collection.discord_url,
                                twitterUsername: collectionRaw.collection.twitter_username,
                                instagramUsername: collectionRaw.collection.instagram_username,
                                chainId: nftUtils_1.NftChainId.ETHEREUM,
                                osOneDayVolume: collectionRaw.collection.stats.one_day_volume,
                                osOneDaySales: collectionRaw.collection.stats.one_day_sales,
                                osOneDayChange: collectionRaw.collection.stats.one_day_change,
                                osSevenDayVolume: collectionRaw.collection.stats.seven_day_volume,
                                osSevenDaySales: collectionRaw.collection.stats.seven_day_sales,
                                osSevenDayChange: collectionRaw.collection.stats.seven_day_change,
                                osThirtyDaySales: collectionRaw.collection.stats.thirty_day_sales,
                                osThirtyDayVolume: collectionRaw.collection.stats.thirty_day_volume,
                                osThirtyDayChange: collectionRaw.collection.stats.thirty_day_change,
                                osTotalVolume: collectionRaw.collection.stats.total_volume,
                                osTotalSales: collectionRaw.collection.stats.total_sales,
                                osFloorPrice: collectionRaw.collection.stats.floor_price,
                                numOwners: collectionRaw.collection.stats.num_owners,
                                totalSupply: collectionRaw.collection.stats.total_supply,
                                traits: JSON.stringify(collectionRaw.collection.traits),
                                updatedAt: moment_1["default"]().unix(),
                                osStatsUpdatedAt: moment_1["default"]().unix()
                            };
                        }
                        if (persist || !isStored) {
                            dbPostUrl = '/.netlify/functions/postCollectionToDb';
                            fetch(dbPostUrl, {
                                method: 'POST',
                                body: JSON.stringify(collection),
                                redirect: 'follow'
                            });
                        }
                        _b.label = 5;
                    case 5:
                        if (setActive)
                            setActiveCollection(collection);
                        if (getTrades) {
                            getCollectionTrades(collection.contractAddress);
                        }
                        return [2 /*return*/, collection];
                    case 6:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
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
        getCollectionBySlug: getCollectionBySlug,
        collectionTrades: collectionTrades,
        getCollectionTrades: getCollectionTrades,
        recentTrades: recentTrades
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
        getCollectionBySlug,
        collectionTrades,
        getCollectionTrades,
        recentTrades,
    ]);
    return (react_1["default"].createElement(MarketplaceProviderContext.Provider, { value: contextValue }, children));
};
exports.useMarketplaceProvider = function () {
    return react_1.useContext(MarketplaceProviderContext);
};
