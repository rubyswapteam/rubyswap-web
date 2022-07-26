"use strict";
exports.__esModule = true;
var react_1 = require("react");
var VerifiedBadgeIcon_1 = require("@/components/VerifiedBadgeIcon");
var EthereumIcon_1 = require("@/components/EthereumIcon");
var CollectionProfileHeader = function (_a) {
    var image = _a.image, name = _a.name, items = _a.items, floor = _a.floor, oneDayVolume = _a.oneDayVolume;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "mb-4 md:mb-0 flex-col w-full z-5 pb-6" },
            react_1["default"].createElement("div", { className: "flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between" },
                react_1["default"].createElement("div", { className: "flex flex-col bg-white p-4 rounded drop-shadow-md" },
                    react_1["default"].createElement("div", { className: "flex items-center flex-shrink-1 truncate" },
                        react_1["default"].createElement("div", { className: "flex-shrink-0 flex items-center justify-center bg-blue rounded-full" },
                            react_1["default"].createElement("img", { className: "h-12 w-12 rounded-full", src: image, alt: name })),
                        react_1["default"].createElement("div", { className: "truncate text-2xl font-semibold text-gray-700 ml-2" }, name),
                        react_1["default"].createElement("span", { className: "ml-2" },
                            react_1["default"].createElement("div", { className: "h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full" },
                                react_1["default"].createElement(VerifiedBadgeIcon_1["default"], { height: 30, width: 30 })))),
                    react_1["default"].createElement("div", { className: "flex my-2 h-4 md:mb-0 text-xs" },
                        react_1["default"].createElement("span", { className: "flex" },
                            react_1["default"].createElement("span", { className: "font-medium text-gray-500" }, "Items:\u00A0"),
                            react_1["default"].createElement("span", { className: "flex items-center text-gray-600" }, items)),
                        react_1["default"].createElement("div", { className: "mx-2 border border-gray-300" }),
                        react_1["default"].createElement("span", { className: "flex" },
                            react_1["default"].createElement("span", { className: "font-medium text-gray-500" }, "Floor:\u00A0"),
                            react_1["default"].createElement("span", { className: "flex items-center text-gray-600" }, floor === null || floor === void 0 ? void 0 :
                                floor.toFixed(2),
                                "\u00A0",
                                react_1["default"].createElement(EthereumIcon_1["default"], { height: 14, width: 14 }))),
                        react_1["default"].createElement("div", { className: "mx-2 border border-gray-300" }),
                        react_1["default"].createElement("span", { className: "flex" },
                            react_1["default"].createElement("span", { className: "font-medium text-gray-500" }, "24h Volume:\u00A0"),
                            react_1["default"].createElement("span", { className: "flex items-center text-gray-600" }, oneDayVolume === null || oneDayVolume === void 0 ? void 0 :
                                oneDayVolume.toFixed(2),
                                "\u00A0",
                                react_1["default"].createElement(EthereumIcon_1["default"], { height: 14, width: 14 })))))))));
};
exports["default"] = CollectionProfileHeader;
