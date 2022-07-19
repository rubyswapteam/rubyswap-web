"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/solid");
var react_2 = require("react");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var UserAnalyticsMarketplaceFilter = function (_a) {
    var options = _a.options, defaultValue = _a.defaultValue;
    var _b = react_2.useState(defaultValue), activeName = _b[0], setActiveName = _b[1];
    return !!options ? (react_2["default"].createElement(react_1.Menu, { as: "div", className: "relative inline-block text-left self-center" },
        react_2["default"].createElement("div", null,
            react_2["default"].createElement(react_1.Menu.Button, { className: "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" },
                activeName.icon,
                activeName.name,
                react_2["default"].createElement(solid_1.ChevronDownIcon, { className: "-mr-1 ml-2 h-5 w-5", "aria-hidden": "true" }))),
        react_2["default"].createElement(react_1.Transition, { as: react_2.Fragment, enter: "transition ease-out duration-200", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
            react_2["default"].createElement(react_1.Menu.Items, { className: "origin-top-right absolute right-0 mt-2 whitespace-nowrap min-w-56 grow max-w-100 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50" },
                react_2["default"].createElement("div", { className: "py-1 max-h-80 overflow-scroll" }, options.map(function (option) { return (react_2["default"].createElement(react_1.Menu.Item, { key: option.name }, function (_a) {
                    var active = _a.active;
                    return (react_2["default"].createElement("a", { href: "#", className: classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm'), onClick: function () {
                            setActiveName(option);
                        } },
                        option.icon,
                        option.name));
                })); })),
                react_2["default"].createElement("div", { className: "py-1" },
                    react_2["default"].createElement(react_1.Menu.Item, null, function (_a) {
                        var active = _a.active;
                        return (react_2["default"].createElement("a", { href: "#", className: classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm'), onClick: function () {
                                setActiveName(defaultValue);
                            } },
                            react_2["default"].createElement(solid_1.TrashIcon, { className: "mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500", "aria-hidden": "true" }),
                            "Clear Filter"));
                    })))))) : (react_2["default"].createElement(react_2["default"].Fragment, null));
};
exports["default"] = UserAnalyticsMarketplaceFilter;
