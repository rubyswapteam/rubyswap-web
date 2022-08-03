"use strict";
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
exports.__esModule = true;
exports.useNftProvider = exports.NftProvider = void 0;
var react_1 = require("react");
var nftUtils_1 = require("@/utils/nftUtils");
var sampleTrending_1 = require("@/data/dummy-data/sampleTrending");
var sampleSweeps_1 = require("@/data/dummy-data/sampleSweeps");
var sampleCollection_1 = require("@/data/dummy-data/sampleCollection");
var sampleCollectionOS_1 = require("@/data/dummy-data/sampleCollectionOS");
var sampleNfts_1 = require("@/data/dummy-data/sampleNfts");
var sampleCollectionUpdates_1 = require("@/data/dummy-data/sampleCollectionUpdates");
var NftProviderContext = react_1["default"].createContext({});
exports.NftProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(), nfts = _b[0], setNfts = _b[1];
    var _c = react_1.useState(), collectionUpdates = _c[0], setNftCollectionUpdates = _c[1];
    var _d = react_1.useState(), trendingNftCollections = _d[0], setTrendingNftCollections = _d[1];
    var _e = react_1.useState(), sweepNftCollections = _e[0], setSweepNftCollections = _e[1];
    var _f = react_1.useState(), nftCollection = _f[0], setNftCollection = _f[1];
    var fetchNftCollection = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftCollection;
        return __generator(this, function (_a) {
            nftCollection = {
                id: sampleCollection_1.SampleCollection[0]._id,
                contractAddress: sampleCollectionOS_1.SampleCollectionOS.collection.primary_asset_contracts[0].address,
                tokenStandard: sampleCollectionOS_1.SampleCollectionOS.collection.primary_asset_contracts[0].schema_name,
                description: sampleCollectionOS_1.SampleCollectionOS.collection.description,
                isVerified: sampleCollectionOS_1.SampleCollectionOS.collection.safelist_request_status == 'verified',
                image: sampleCollectionOS_1.SampleCollectionOS.collection.image_url,
                bannerImage: sampleCollectionOS_1.SampleCollectionOS.collection.banner_image_url,
                slug: sampleCollectionOS_1.SampleCollectionOS.collection.slug,
                name: sampleCollectionOS_1.SampleCollectionOS.collection.name,
                chainId: nftUtils_1.NftChainId.ETHEREUM,
                oneDayVolume: sampleCollectionOS_1.SampleCollectionOS.collection.stats.one_day_volume,
                oneDaySales: sampleCollectionOS_1.SampleCollectionOS.collection.stats.one_day_sales,
                oneDayAveragePrice: sampleCollectionOS_1.SampleCollectionOS.collection.stats.one_day_average_price,
                sevenDayVolume: sampleCollectionOS_1.SampleCollectionOS.collection.stats.seven_day_volume,
                sevenDaySales: sampleCollectionOS_1.SampleCollectionOS.collection.stats.seven_day_sales,
                thirtyDaySales: sampleCollectionOS_1.SampleCollectionOS.collection.stats.thirty_day_sales,
                thirtyDayVolume: sampleCollectionOS_1.SampleCollectionOS.collection.stats.thirty_day_volume,
                floor: sampleCollectionOS_1.SampleCollectionOS.collection.stats.floor_price,
                owners: sampleCollectionOS_1.SampleCollectionOS.collection.stats.num_owners,
                count: sampleCollectionOS_1.SampleCollectionOS.collection.stats.count,
                supply: sampleCollectionOS_1.SampleCollectionOS.collection.stats.total_supply
            };
            setNftCollection(nftCollection);
            return [2 /*return*/];
        });
    }); }, []);
    var fetchNftCollectionUpdates = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var collectionUpdates, i, collectionUpdate;
        return __generator(this, function (_a) {
            collectionUpdates = [];
            for (i = 0; i < sampleCollectionUpdates_1.SampleCollectionUpdates.length; i++) {
                collectionUpdate = {
                    id: sampleCollectionUpdates_1.SampleCollectionUpdates[i].id,
                    username: sampleCollectionUpdates_1.SampleCollectionUpdates[i].username,
                    userAddress: sampleCollectionUpdates_1.SampleCollectionUpdates[i].userAddress,
                    posted: sampleCollectionUpdates_1.SampleCollectionUpdates[i].posted,
                    collectionName: sampleCollectionUpdates_1.SampleCollectionUpdates[i].collectionName,
                    imageUrl: sampleCollectionUpdates_1.SampleCollectionUpdates[i].imageUrl,
                    smallImageUrl: sampleCollectionUpdates_1.SampleCollectionUpdates[i].smallImageUrl,
                    holdersOnly: sampleCollectionUpdates_1.SampleCollectionUpdates[i].holdersOnly,
                    updateType: sampleCollectionUpdates_1.SampleCollectionUpdates[i].updateType,
                    title: sampleCollectionUpdates_1.SampleCollectionUpdates[i].title,
                    message: sampleCollectionUpdates_1.SampleCollectionUpdates[i].message,
                    likes: sampleCollectionUpdates_1.SampleCollectionUpdates[i].likes
                };
                collectionUpdates.push(collectionUpdate);
            }
            setNftCollectionUpdates(collectionUpdates);
            return [2 /*return*/];
        });
    }); }, []);
    var fetchNfts = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var nfts, i, nft;
        return __generator(this, function (_a) {
            nfts = [];
            for (i = 0; i < sampleNfts_1.SampleNfts.length; i++) {
                nft = {
                    id: sampleNfts_1.SampleNfts[i]._id,
                    tokenId: sampleNfts_1.SampleNfts[i].id,
                    collectionName: sampleNfts_1.SampleNfts[i].collectionName,
                    contractAddress: sampleNfts_1.SampleNfts[i].address,
                    image: sampleNfts_1.SampleNfts[i].imageUrl,
                    chainId: nftUtils_1.NftChainId.ETHEREUM,
                    imageAlt: sampleNfts_1.SampleNfts[i].collectionName,
                    name: sampleNfts_1.SampleNfts[i].name,
                    price: parseFloat((sampleNfts_1.SampleNfts[i].currentBasePrice * Math.pow(10, -18)).toPrecision(4)),
                    marketplace: sampleNfts_1.SampleNfts[i].market
                };
                nfts.push(nft);
            }
            setNfts(nfts);
            return [2 /*return*/];
        });
    }); }, []);
    var fetchAllTrendingNftCollections = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftCollections, i, nftCollection_1;
        return __generator(this, function (_a) {
            nftCollections = [];
            for (i = 0; i < sampleTrending_1.SampleTrending.length; i++) {
                nftCollection_1 = {
                    id: sampleTrending_1.SampleTrending[i]._id,
                    image: sampleTrending_1.SampleTrending[i].imageUrl,
                    slug: sampleTrending_1.SampleTrending[i].slug,
                    name: sampleTrending_1.SampleTrending[i].name,
                    chainId: nftUtils_1.NftChainId.ETHEREUM,
                    oneDayVolume: sampleTrending_1.SampleTrending[i].stats.one_day_volume,
                    floor: sampleTrending_1.SampleTrending[i].stats.floor_price,
                    oneDaySales: sampleTrending_1.SampleTrending[i].stats.one_day_sales,
                    oneDayAveragePrice: sampleTrending_1.SampleTrending[i].stats.one_day_average_price,
                    owners: sampleTrending_1.SampleTrending[i].stats.num_owners,
                    isVerified: sampleTrending_1.SampleTrending[i].isVerified
                };
                nftCollections.push(nftCollection_1);
            }
            setTrendingNftCollections(nftCollections);
            return [2 /*return*/];
        });
    }); }, []);
    var fetchAllSweepNftCollections = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftSweepCollections, i, nftSweepCollection;
        return __generator(this, function (_a) {
            nftSweepCollections = [];
            for (i = 0; i < sampleSweeps_1.SampleSweeps.length; i++) {
                nftSweepCollection = {
                    id: sampleSweeps_1.SampleSweeps[i].collections[0]._id,
                    collectionAddress: sampleSweeps_1.SampleSweeps[i].collectionsBought[0],
                    image: sampleSweeps_1.SampleSweeps[i].collections[0].imageUrl,
                    isVerified: sampleSweeps_1.SampleSweeps[i].collections[0].isVerified,
                    name: sampleSweeps_1.SampleSweeps[i].collections[0].name,
                    chainId: nftUtils_1.NftChainId.ETHEREUM,
                    value: sampleSweeps_1.SampleSweeps[i].totalEthSpent,
                    sales: sampleSweeps_1.SampleSweeps[i].numItemsBought,
                    buyer: nftUtils_1.getTrimmedAddressEllipsisMiddle(sampleSweeps_1.SampleSweeps[i].buyer),
                    transaction: nftUtils_1.getTrimmedAddressEllipsisMiddle(sampleSweeps_1.SampleSweeps[i].transactionHash),
                    timestamp: sampleSweeps_1.SampleSweeps[i].timestamp
                };
                nftSweepCollections.push(nftSweepCollection);
            }
            setSweepNftCollections(nftSweepCollections);
            return [2 /*return*/];
        });
    }); }, []);
    var contextValue = react_1.useMemo(function () { return ({
        nfts: nfts,
        setNfts: setNfts,
        fetchNfts: fetchNfts,
        trendingNftCollections: trendingNftCollections,
        fetchAllTrendingNftCollections: fetchAllTrendingNftCollections,
        sweepNftCollections: sweepNftCollections,
        fetchAllSweepNftCollections: fetchAllSweepNftCollections,
        nftCollection: nftCollection,
        setNftCollection: setNftCollection,
        fetchNftCollection: fetchNftCollection,
        collectionUpdates: collectionUpdates,
        fetchNftCollectionUpdates: fetchNftCollectionUpdates,
        setNftCollectionUpdates: setNftCollectionUpdates
    }); }, [
        nfts,
        setNfts,
        fetchNfts,
        trendingNftCollections,
        fetchAllTrendingNftCollections,
        sweepNftCollections,
        fetchAllSweepNftCollections,
        nftCollection,
        setNftCollection,
        fetchNftCollection,
        collectionUpdates,
        fetchNftCollectionUpdates,
        setNftCollectionUpdates,
    ]);
    return (react_1["default"].createElement(NftProviderContext.Provider, { value: contextValue }, children));
};
exports.useNftProvider = function () { return react_1.useContext(NftProviderContext); };
