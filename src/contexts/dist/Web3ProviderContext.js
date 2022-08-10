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
var ethers_1 = require("ethers");
var react_1 = require("react");
var injected_wallets_1 = require("@web3-onboard/injected-wallets");
var walletconnect_1 = require("@web3-onboard/walletconnect");
var core_1 = require("@web3-onboard/core");
var coinbase_1 = require("@web3-onboard/coinbase");
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
    function connectWallet() {
        return __awaiter(this, void 0, void 0, function () {
            var wallets, _a, accounts, chains, provider_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, onboard.connectWallet()];
                    case 1:
                        wallets = _b.sent();
                        setIsLoading(true);
                        _a = wallets[0], accounts = _a.accounts, chains = _a.chains, provider_1 = _a.provider;
                        setActiveWallet(accounts[0].address);
                        setChainId(chains[0].id);
                        setProvider(provider_1);
                        setIsLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    // async function connectWallet() {
    //   try {
    //     const web3ModalInstance = await web3Modal.connect();
    //     console.log(web3ModalInstance);
    //     const web3ModalProvider = new ethers.providers.Web3Provider(
    //       web3ModalInstance,
    //     );
    //     console.log(web3ModalProvider);
    //     setProvider(web3ModalProvider);
    //     setActiveWallet((web3ModalProvider.provider as any).selectedAddress);
    //     console.log((web3ModalProvider.provider as any).selectedAddress);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
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
    };
    var truncateAddress = function (address) {
        if (!address)
            return 'No Account';
        var match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
        if (!match)
            return address;
        return match[1] + "\u2026" + match[2];
    };
    var toHex = function (num) {
        var val = Number(num);
        return '0x' + val.toString(16);
    };
    // function setListener() {
    //   provider.provider.on('accountsChanged', (accounts: any[]) => {
    //     setActiveWallet(accounts[0]);
    //   });
    // }
    function fetchEthBalance(address) {
        if (provider && provider.provider) {
            provider.getBalance(address).then(function (balance) {
                var balanceInEth = ethers_1.ethers.utils.formatEther(balance);
                setEthBalance(balanceInEth);
            });
        }
    }
    var contextValue = react_1.useMemo(function () { return ({
        provider: provider,
        setProvider: setProvider,
        connectWallet: connectWallet,
        activeWallet: activeWallet,
        setActiveWallet: setActiveWallet,
        fetchEthBalance: fetchEthBalance,
        ethBalance: ethBalance
    }); }, [
        provider,
        setProvider,
        connectWallet,
        activeWallet,
        setActiveWallet,
        fetchEthBalance,
        ethBalance,
    ]);
    return (react_1["default"].createElement(Web3ProviderContext.Provider, { value: contextValue }, children));
};
exports.useWeb3Provider = function () { return react_1.useContext(Web3ProviderContext); };
