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
exports.useWeb3Provider = exports.Web3Provider = void 0;
var coinbase_1 = require("@web3-onboard/coinbase");
var core_1 = require("@web3-onboard/core");
var injected_wallets_1 = require("@web3-onboard/injected-wallets");
var walletconnect_1 = require("@web3-onboard/walletconnect");
var mixpanel_browser_1 = require("mixpanel-browser");
var react_1 = require("react");
var Web3ProviderContext = react_1["default"].createContext({});
var injected = injected_wallets_1["default"]();
var walletConnect = walletconnect_1["default"]();
var coinbaseWallet = coinbase_1["default"]();
var MAINNET_RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1';
var onboard = core_1["default"]({
    wallets: [coinbaseWallet, walletConnect, injected],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            namespace: 'evm',
            label: 'Ethereum Mainnet',
            rpcUrl: MAINNET_RPC_URL
        },
    ],
    appMetadata: {
        name: 'My App',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'My app using Onboard',
        recommendedInjectedWallets: [
            { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
            { name: 'MetaMask', url: 'https://metamask.io' },
        ]
    },
    accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } }
});
exports.Web3Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(undefined), provider = _b[0], setProvider = _b[1];
    var _c = react_1.useState(undefined), activeWallet = _c[0], setActiveWallet = _c[1];
    var _d = react_1.useState(undefined), ethBalance = _d[0], setEthBalance = _d[1];
    var _e = react_1.useState(''), chainId = _e[0], setChainId = _e[1];
    var _f = react_1.useState(), network = _f[0], setNetwork = _f[1];
    var _g = react_1.useState(false), isLoading = _g[0], setIsLoading = _g[1];
    react_1.useEffect(function () {
        if (provider) {
            // setListener();
        }
    }, [provider]);
    // useEffect(() => {
    //   const connectWalletOnPageLoad = async () => {
    //     if (
    //       !!localStorage &&
    //       !!localStorage.getItem('isWalletConnectedRuby') &&
    //       (localStorage.getItem('isWalletConnectedRuby') || '').length > 10
    //     ) {
    //       try {
    //         const cachedData = JSON.parse(
    //           localStorage.getItem('isWalletConnectedRuby') || '',
    //         );
    //         setActiveWallet(cachedData.wallet);
    //         setChainId(cachedData.chainId);
    //         setProvider(cachedData.provider);
    //       } catch (ex) {
    //         console.log(ex);
    //       }
    //     }
    //   };
    //   connectWalletOnPageLoad();
    // }, []);
    react_1.useEffect(function () {
        loadPreviouslyConnectedWallet().then(function (res) { return setActiveWallet(res); });
    }, []);
    function loadPreviouslyConnectedWallet() {
        return __awaiter(this, void 0, void 0, function () {
            var previouslyConnectedWallets, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previouslyConnectedWallets = JSON.parse(localStorage.getItem('connectedWallets') || '{}');
                        if (!previouslyConnectedWallets) return [3 /*break*/, 2];
                        console.log('autoconnect');
                        return [4 /*yield*/, onboard.connectWallet({
                                autoSelect: {
                                    label: previouslyConnectedWallets[0],
                                    disableModals: true
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, onboard.state.get().wallets[0].accounts[0].address];
                    case 3:
                        wallet = _a.sent();
                        console.table({ previousWallet: wallet });
                        console.log(onboard.state);
                        return [2 /*return*/, wallet];
                }
            });
        });
    }
    function connectWallet() {
        return __awaiter(this, void 0, void 0, function () {
            var walletsSub, unsubscribe, wallets, _a, accounts, chains, provider_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletsSub = onboard.state.select('wallets');
                        unsubscribe = walletsSub.subscribe(function (wallets) {
                            console.log(wallets);
                            var connectedWallets = wallets.map(function (_a) {
                                var label = _a.label;
                                return label;
                            });
                            window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
                        }).unsubscribe;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, onboard.connectWallet()];
                    case 2:
                        wallets = _b.sent();
                        setIsLoading(true);
                        _a = wallets[0], accounts = _a.accounts, chains = _a.chains, provider_1 = _a.provider;
                        setActiveWallet(accounts[0].address);
                        mixpanel_browser_1["default"].track('Connect Wallet', {
                            address: accounts[0].address
                        });
                        fetchEthBalance(accounts[0]);
                        setChainId(chains[0].id);
                        setProvider(provider_1);
                        localStorage.setItem("isWalletConnectedRuby-" + chains[0].id, JSON.stringify({
                            wallet: accounts[0].address,
                            chainId: chains[0].id
                        }));
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var switchNetwork = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onboard.setChain({ chainId: toHex(network) })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleNetwork = function (e) {
        var id = e.target.value;
        setNetwork(Number(id));
    };
    var disconnect = function () { return __awaiter(void 0, void 0, void 0, function () {
        var primaryWallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onboard.state.get().wallets];
                case 1:
                    primaryWallet = (_a.sent())[0];
                    if (!primaryWallet)
                        return [2 /*return*/];
                    return [4 /*yield*/, onboard.disconnectWallet({ label: primaryWallet.label })];
                case 2:
                    _a.sent();
                    refreshState();
                    return [2 /*return*/];
            }
        });
    }); };
    var refreshState = function () {
        setActiveWallet('');
        setChainId('');
        setProvider(undefined);
        localStorage.setItem('isWalletConnectedRuby', 'false');
    };
    var toHex = function (num) {
        var val = Number(num);
        return '0x' + val.toString(16);
    };
    function fetchEthBalance(account) {
        if (account && account.balance) {
            setEthBalance(Number(account.balance.ETH).toFixed(3));
        }
    }
    var contextValue = react_1.useMemo(function () { return ({
        provider: provider,
        setProvider: setProvider,
        connectWallet: connectWallet,
        activeWallet: activeWallet,
        setActiveWallet: setActiveWallet,
        ethBalance: ethBalance,
        disconnect: disconnect
    }); }, [
        provider,
        setProvider,
        connectWallet,
        activeWallet,
        setActiveWallet,
        ethBalance,
        disconnect,
    ]);
    return (react_1["default"].createElement(Web3ProviderContext.Provider, { value: contextValue }, children));
};
exports.useWeb3Provider = function () { return react_1.useContext(Web3ProviderContext); };
