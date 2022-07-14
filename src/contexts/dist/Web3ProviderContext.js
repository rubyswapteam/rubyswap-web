"use strict";
exports.__esModule = true;
exports.useWalletProvider = exports.Web3Provider = void 0;
var react_1 = require("react");
var Web3ProviderContext = react_1["default"].createContext({});
exports.Web3Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState([]), activeNfts = _b[0], setActiveNfts = _b[1];
    function getCollectionNfts() {
        var x = 1;
    }
    var contextValue = react_1.useMemo(function () { return ({
        getCollectionNfts: getCollectionNfts,
        activeNfts: activeNfts,
        setActiveNfts: setActiveNfts
    }); }, [getCollectionNfts, activeNfts, setActiveNfts]);
    return (react_1["default"].createElement(Web3ProviderContext.Provider, { value: contextValue }, children));
};
exports.useWalletProvider = function () { return react_1.useContext(Web3ProviderContext); };
