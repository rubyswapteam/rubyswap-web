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
exports.__esModule = true;
exports.useWalletProvider = exports.WalletProvider = void 0;
var nftUtils_1 = require("@/utils/nftUtils");
var axios_1 = require("axios");
var react_1 = require("react");
var WalletProviderContext = react_1["default"].createContext({});
exports.WalletProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(), userNfts = _b[0], setUserNfts = _b[1];
    var _c = react_1.useState({}), collectionNames = _c[0], setCollectionNames = _c[1];
    var _d = react_1.useState(), userNftCollections = _d[0], setUserNftCollections = _d[1];
    var _e = react_1.useState(), userNftsByCollection = _e[0], setUserNftsByCollection = _e[1];
    var _f = react_1.useState([]), activeNfts = _f[0], setActiveNfts = _f[1];
    var fetchCollectionNames = react_1.useCallback(function (contractAddress) { return __awaiter(void 0, void 0, void 0, function () {
        var activeMapping;
        return __generator(this, function (_a) {
            activeMapping = collectionNames;
            if (!collectionNames[contractAddress]) {
                axios_1["default"]
                    .get("https://eth-mainnet.g.alchemy.com/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getContractMetadata/?contractAddress=" + contractAddress)
                    .then(function (contractRes) {
                    activeMapping[contractAddress] =
                        contractRes.data.contractMetadata.name;
                    setCollectionNames(__assign({}, activeMapping));
                });
            }
            return [2 /*return*/];
        });
    }); }, []);
    var fetchUserNfts = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var pageKey, counter, userNfts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pageKey = '';
                    counter = 0;
                    userNfts = {
                        ownedNfts: [],
                        summary: [],
                        totalCount: 0
                    };
                    if (!user) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1: return [4 /*yield*/, axios_1["default"]
                        .get("https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=" + user + pageKey)
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var summary;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    Array.prototype.push.apply(userNfts.ownedNfts, res.data.ownedNfts);
                                    userNfts.totalCount = res.data.totalCount;
                                    pageKey = res.data.pageKey ? '&pageKey=' + res.data.pageKey : '';
                                    summary = userNfts.summary;
                                    return [4 /*yield*/, res.data.ownedNfts.forEach(function (element) { return __awaiter(void 0, void 0, void 0, function () {
                                            var activeContract, index;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        activeContract = element.contract.address;
                                                        index = summary.findIndex(function (collection) {
                                                            return collection.contract == activeContract;
                                                        });
                                                        if (index !== -1) {
                                                            summary[index].count++;
                                                        }
                                                        else {
                                                            summary.push({
                                                                contract: activeContract,
                                                                count: 1
                                                            });
                                                        }
                                                        return [4 /*yield*/, fetchCollectionNames(activeContract)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    userNfts.summary = summary;
                                    return [2 /*return*/];
                            }
                        });
                    }); })["finally"](function () {
                        setUserNfts(__assign({}, userNfts));
                    })];
                case 2:
                    _a.sent();
                    counter++;
                    _a.label = 3;
                case 3:
                    if (pageKey !== '') return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    function getCollectionNfts(contractAddress) {
        if (userNfts) {
            setActiveNfts([]);
            var filteredNfts = userNfts.ownedNfts.filter(function (x) { return x.contract.address === contractAddress; });
            var nfts_1 = [];
            filteredNfts === null || filteredNfts === void 0 ? void 0 : filteredNfts.forEach(function (nft) {
                var _a, _b, _c;
                var newNFT = {
                    tokenId: Number(nft.id.tokenId).toString(),
                    collectionName: collectionNames[contractAddress],
                    contractAddress: contractAddress,
                    image: optimisedImageLinks([
                        (_a = nft === null || nft === void 0 ? void 0 : nft.media[0]) === null || _a === void 0 ? void 0 : _a.raw,
                        (_b = nft === null || nft === void 0 ? void 0 : nft.media[0]) === null || _b === void 0 ? void 0 : _b.gateway,
                        (_c = nft === null || nft === void 0 ? void 0 : nft.media[0]) === null || _c === void 0 ? void 0 : _c.thumbnail,
                        nft.metadata.image,
                    ]),
                    chainId: nftUtils_1.NftChainId.ETHEREUM,
                    imageAlt: nft.title + ' - ' + nft.description,
                    name: nft.title || '#'.concat(Number(nft.id.tokenId).toString())
                };
                nfts_1.push(newNFT);
            });
            setActiveNfts(nfts_1);
        }
    }
    function optimisedImageLinks(links) {
        var scores = links.map(function (link) {
            var score = 0;
            link && link.length > 1 ? score++ : (score = -100);
            if (!(link === null || link === void 0 ? void 0 : link.includes('ipfs')))
                score++;
            if (!(link === null || link === void 0 ? void 0 : link.includes('https://ipfs.io')))
                score++;
            return score;
        });
        console.log.apply(console, scores);
        var index = scores.findIndex(function (score) { return score == Math.max.apply(Math, scores); });
        return links[index].replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    var fetchUserNftsByCollection = react_1.useCallback(function (user, contract) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=" + user + "&contractAddresses[]=" + contract)
                .then(function (res) {
                var userNfts = res.data.ownedNfts;
                setUserNftsByCollection(userNfts);
            });
            return [2 /*return*/];
        });
    }); }, []);
    var fetchUserNftCollections = react_1.useCallback(function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://eth-mainnet.alchemyapi.io/nft/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1/getNFTs/?owner=" + user + "&withMetadata=False")
                .then(function (res) {
                var userNfts = res.data.ownedNfts;
                setUserNftCollections(userNfts);
            });
            return [2 /*return*/];
        });
    }); }, []);
    var contextValue = react_1.useMemo(function () { return ({
        userNfts: userNfts,
        setUserNfts: setUserNfts,
        fetchUserNfts: fetchUserNfts,
        collectionNames: collectionNames,
        setCollectionNames: setCollectionNames,
        fetchCollectionNames: fetchCollectionNames,
        userNftCollections: userNftCollections,
        setUserNftCollections: setUserNftCollections,
        fetchUserNftCollections: fetchUserNftCollections,
        userNftsByCollection: userNftsByCollection,
        setUserNftsByCollection: setUserNftsByCollection,
        fetchUserNftsByCollection: fetchUserNftsByCollection,
        getCollectionNfts: getCollectionNfts,
        activeNfts: activeNfts,
        setActiveNfts: setActiveNfts
    }); }, [
        userNfts,
        setUserNfts,
        fetchUserNfts,
        collectionNames,
        setCollectionNames,
        fetchCollectionNames,
        userNftCollections,
        setUserNftCollections,
        fetchUserNftCollections,
        userNftsByCollection,
        setUserNftsByCollection,
        fetchUserNftsByCollection,
        getCollectionNfts,
        activeNfts,
        setActiveNfts,
    ]);
    return (react_1["default"].createElement(WalletProviderContext.Provider, { value: contextValue }, children));
};
exports.useWalletProvider = function () { return react_1.useContext(WalletProviderContext); };
