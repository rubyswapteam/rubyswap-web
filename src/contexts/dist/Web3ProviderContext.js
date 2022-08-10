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
var web3modal_1 = require("web3modal");
var ethers_1 = require("ethers");
var react_1 = require("react");
var wallet_sdk_1 = require("@coinbase/wallet-sdk");
var web3_provider_1 = require("@walletconnect/web3-provider");
var Web3ProviderContext = react_1["default"].createContext({});
exports.Web3Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(undefined), provider = _b[0], setProvider = _b[1];
    var _c = react_1.useState(undefined), activeWallet = _c[0], setActiveWallet = _c[1];
    var _d = react_1.useState(undefined), ethBalance = _d[0], setEthBalance = _d[1];
    var _e = react_1.useState(-1), chainId = _e[0], setChainId = _e[1];
    react_1.useEffect(function () {
        if (provider) {
            setListener();
        }
    }, [provider]);
    function connectWallet() {
        return __awaiter(this, void 0, void 0, function () {
            var providerOptions, web3Modal, web3ModalInstance, web3ModalProvider, accounts, network, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        providerOptions = {
                            walletconnect: {
                                package: web3_provider_1["default"],
                                options: {
                                    rpc: {
                                        1: 'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1'
                                    }
                                }
                            },
                            coinbasewallet: {
                                package: wallet_sdk_1.CoinbaseWalletSDK,
                                options: {
                                    appName: 'My Awesome App',
                                    rpc: 'https://eth-mainnet.g.alchemy.com/v2/63TUZT19v5atqFMTgBaWKdjvuIvaYud1'
                                }
                            }
                        };
                        web3Modal = new web3modal_1["default"]({
                            cacheProvider: true,
                            providerOptions: providerOptions
                        });
                        return [4 /*yield*/, web3Modal.connect()];
                    case 1:
                        web3ModalInstance = _a.sent();
                        console.log(web3ModalInstance);
                        web3ModalProvider = new ethers_1.ethers.providers.Web3Provider(web3ModalInstance);
                        return [4 /*yield*/, web3ModalProvider.listAccounts()];
                    case 2:
                        accounts = _a.sent();
                        return [4 /*yield*/, web3ModalProvider.getNetwork()];
                    case 3:
                        network = _a.sent();
                        setChainId(network.chainId);
                        setProvider(web3ModalProvider);
                        if (accounts)
                            setActiveWallet(accounts[0]);
                        setActiveWallet(web3ModalProvider.provider.selectedAddress);
                        console.log(web3ModalProvider.provider.selectedAddress);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
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
    function setListener() {
        provider.provider.on('accountsChanged', function (accounts) {
            setActiveWallet(accounts[0]);
        });
    }
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
