"use strict";
exports.__esModule = true;
exports.GasTracker = void 0;
var GasIcon_1 = require("./GasIcon");
function GasTracker(props) {
    return (React.createElement("div", { className: "my-4 p-2 text-xs font-medium text-gray-600 dark:text-gray-300" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement(GasIcon_1["default"], { height: 15, width: 15 }),
            React.createElement("div", { className: "pt-1" }, props.item))));
}
exports.GasTracker = GasTracker;
