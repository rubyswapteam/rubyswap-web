"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var moment_1 = require("moment");
var react_3 = require("@headlessui/react");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
function CollectionUpdate(props) {
    var _a = react_1.useState(false), enabled = _a[0], setEnabled = _a[1];
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_2.Switch.Group, { as: "div", className: "flex items-center" },
            react_1["default"].createElement(react_2.Switch, { checked: enabled, onChange: setEnabled, className: classNames(enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500') },
                react_1["default"].createElement("span", { "aria-hidden": "true", className: classNames(enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200') })),
            react_1["default"].createElement(react_2.Switch.Label, { as: "span", className: "ml-3" },
                react_1["default"].createElement("span", { className: "text-sm font-medium text-gray-900" }, "Holder Only"))),
        props.collectionUpdates.map(function (update) { return (react_1["default"].createElement(react_3.Transition, { key: update.id, show: !enabled || update.holdersOnly, enter: "transition-opacity duration-200", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "transition-opacity duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
            react_1["default"].createElement("div", { className: "bg-white drop-shadow-md p-4 my-8 rounded-lg text-sm overflow-hidden" },
                react_1["default"].createElement("div", { className: "justify-between w-full flex mb-5" },
                    react_1["default"].createElement("div", { className: "flex items-center" },
                        react_1["default"].createElement("img", { className: "h-10 w-10 rounded-full my-auto", src: update.smallImageUrl }),
                        react_1["default"].createElement("a", { className: "text-sm font-medium text-transparent bg-clip-text bg-cover bg-theme-gradient mx-3" }, update.username || update.userAddress),
                        react_1["default"].createElement("a", { className: "text-sm font-medium text-gray-400" }, moment_1["default"]
                            .unix(update.posted)
                            .local()
                            .startOf('seconds')
                            .fromNow())),
                    react_1["default"].createElement("div", { className: "py-0.5 px-2 rounded-md bg-gray-100 self-center" }, update.updateType)),
                react_1["default"].createElement("div", { className: "font-bold mb-3" }, update.title),
                react_1["default"].createElement("div", { dangerouslySetInnerHTML: { __html: update.message } }),
                react_1["default"].createElement("div", { className: "mt-5" },
                    react_1["default"].createElement("div", { className: "py-2 px-2 rounded-md bg-gray-100 self-center inline cursor-pointer hover:bg-gray-200" },
                        '👍',
                        " ",
                        update.likes))))); })));
}
exports["default"] = CollectionUpdate;
