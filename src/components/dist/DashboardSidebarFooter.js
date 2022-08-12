"use strict";
exports.__esModule = true;
exports.DashboardSidebarFooter = void 0;
var react_1 = require("react");
var EthPriceTracker_1 = require("./EthPriceTracker");
var GasTracker_1 = require("./GasTracker");
var ThemeToggle_1 = require("./ThemeToggle");
function DashboardSidebarFooter() {
    var _a = react_1.useState(undefined), item = _a[0], setItem = _a[1];
    var fetchData = function () {
        fetch('/.netlify/functions/getDbEthMetrics').then(function (res) {
            return res.json().then(function (result) {
                setItem(result[0]);
            });
        });
    };
    react_1.useEffect(function () {
        fetchData();
        var interval = setInterval(function () {
            fetchData();
        }, 20000);
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement(React.Fragment, null,
        item && (React.createElement(React.Fragment, null,
            React.createElement(EthPriceTracker_1.EthPriceTracker, { item: item === null || item === void 0 ? void 0 : item.ethPrice }),
            React.createElement("div", { className: "h-4 border-l border-gray-200 border-0.5" }))),
        item && (React.createElement(React.Fragment, null,
            React.createElement(GasTracker_1.GasTracker, { item: item === null || item === void 0 ? void 0 : item.gasPrice }),
            React.createElement("div", { className: "h-4 border-l border-gray-200 border-0.5" }))),
        React.createElement(ThemeToggle_1["default"], null)));
}
exports.DashboardSidebarFooter = DashboardSidebarFooter;
