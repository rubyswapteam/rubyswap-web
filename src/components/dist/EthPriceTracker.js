"use strict";
exports.__esModule = true;
exports.EthPriceTracker = void 0;
var EthereumIcon_1 = require("./EthereumIcon");
function EthPriceTracker(props) {
    return (React.createElement("div", { className: "my-4 p-2 text-xs font-medium text-gray-600 dark:text-gray-300" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement(EthereumIcon_1["default"], { height: 15, width: 15 }),
            React.createElement("div", { className: "pt-1" }, props.item))));
}
exports.EthPriceTracker = EthPriceTracker;
