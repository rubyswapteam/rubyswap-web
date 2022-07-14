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
exports.__esModule = true;
require("../styles/globals.css");
var NftProviderContext_1 = require("@/contexts/NftProviderContext");
var WalletProviderContext_1 = require("@/contexts/WalletProviderContext");
function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (React.createElement(WalletProviderContext_1.WalletProvider, null,
        React.createElement(NftProviderContext_1.NftProvider, null,
            React.createElement(Component, __assign({}, pageProps)))));
}
exports["default"] = App;
