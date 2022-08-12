"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CollectionHolderTable = function (_a) {
    var holderCounts = _a.holderCounts, total = _a.total;
    return (react_1["default"].createElement("table", { className: "overflow-auto inline-block w-full h-full border-r-2 border-gray-100 dark:border-white/10" },
        react_1["default"].createElement("thead", { className: "flex w-full" },
            react_1["default"].createElement("tr", { className: "flex w-full" },
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "NFTs Per Wallet")),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Wallets")),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Total")),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Collection %")))),
        react_1["default"].createElement("tbody", { className: "h-full overflow-scroll bg-white dark:bg-white/5 block w-full" }, holderCounts &&
            Object.keys(holderCounts)
                .slice(0)
                .reverse()
                .map(function (count) { return (react_1["default"].createElement("tr", { key: count, className: "flex hover:bg-black/5 dark:hover:bg-black/75" },
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, count)),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, holderCounts[count])),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, parseInt(count) * holderCounts[count]),
                    ' '),
                react_1["default"].createElement("div", { className: "w-[25%]" },
                    react_1["default"].createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, ((100 * parseInt(count) * holderCounts[count]) /
                        total).toFixed(2))))); }))));
};
exports["default"] = CollectionHolderTable;
