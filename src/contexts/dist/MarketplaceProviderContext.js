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
exports.useMarketplaceProvider = exports.MarketplaceProvider = void 0;
var react_1 = require("react");
var MarketplaceProviderContext = react_1["default"].createContext({});
exports.MarketplaceProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(undefined), userTrades = _b[0], setUserTrades = _b[1];
    // const x2y2Token = '38d74028-ca13-48df-ab81-bdfa4f3ab834';
    function getUserTrades(from, to, contract) {
        if (from === void 0) { from = ''; }
        if (to === void 0) { to = ''; }
        if (contract === void 0) { contract = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var from_address, to_address, contract_address, API_URL, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from_address = from != undefined ? '=' + from : '';
                        to_address = to != undefined ? '=' + to : '';
                        contract_address = contract != undefined ? '=' + contract : '';
                        API_URL = "https://rubynft.netlify.app/.netlify/functions/getTradesByContract?from" + from_address + "&to" + to_address + "&contract" + contract_address;
                        // axios.get(API_URL).then((res) => {
                        //   setUserTrades(res.data);
                        // });
                        console.log(API_URL);
                        return [4 /*yield*/, fetch(API_URL, {
                                mode: 'no-cors',
                                method: 'GET'
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        // const result = await res.json();
                        setUserTrades(res);
                        return [2 /*return*/];
                }
            });
        });
    }
    // const getUserTrades = useCallback(
    // async (user: string, collection?: string) => {
    // let sales = {};
    // let purchases = {};
    // const contractString = collection ? '=' + collection : '';
    // axios
    // .get(
    // `https://api.x2y2.org/v1/events?type=sale&from_address=${user}&to_address&contract${contractString}`,
    // {
    //   headers: { 'X-API-KEY': x2y2Token },
    // },
    // )
    // .then((res) => {
    // sales = res;
    // });
    // axios
    //   .get(
    //     `https://api.x2y2.org/v1/events?type=sale&from_address&to_address=${user}&contract${contractString}`,
    //     {
    //       headers: { 'X-API-KEY': x2y2Token },
    //     },
    //   )
    //   .then((res) => {
    //     purchases = res;
    //   });
    // setUserTrades({ sales: sales, purchases: purchases });
    // },
    // [],
    // );
    var contextValue = react_1.useMemo(function () { return ({
        userTrades: userTrades,
        setUserTrades: setUserTrades,
        getUserTrades: getUserTrades
    }); }, [userTrades, setUserTrades, getUserTrades]);
    return (react_1["default"].createElement(MarketplaceProviderContext.Provider, { value: contextValue }, children));
};
exports.useMarketplaceProvider = function () {
    return react_1.useContext(MarketplaceProviderContext);
};
