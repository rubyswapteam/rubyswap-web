"use strict";
exports.__esModule = true;
var react_1 = require("react");
function TraitsSidebarFilter(props) {
    var _a = react_1.useState(undefined), traitTable = _a[0], setTraitTable = _a[1];
    function camelize(str) {
        return str.replace(/(^\w{1})|(\s+\w{1})/g, function (letter) {
            return letter.toUpperCase();
        });
    }
    react_1.useEffect(function () {
        if (props.traits) {
            var keys = Object.keys(props.traits);
            var traitCounts = keys.map(function (key) {
                return {
                    key: key,
                    count: props.traits[key] ? Object.keys(props.traits[key]).length : 0
                };
            });
            setTraitTable(traitCounts.sort(function (a, b) { return a.key.localeCompare(b.key); }));
        }
    }, [props.traits]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white flex-col h-inherit overflow-scroll w-[20vw] px-3 pt-5 float-right drop-shadow z-0 text-sm pb-60" },
            React.createElement("div", { className: "flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer" },
                React.createElement("div", { className: "font-semibold" }, "Traits"),
                React.createElement("div", null, traitTable === null || traitTable === void 0 ? void 0 : traitTable.length)),
            traitTable &&
                traitTable.map(function (trait, i) { return (React.createElement("div", { key: i },
                    React.createElement("div", { className: 'flex justify-between p-2 mt-1 rounded-md cursor-pointer' +
                            // (props.activeCollection == nft.contract
                            // ? ' bg-blue-50': ' hover:bg-gray-50')
                            ' hover:bg-gray-50' },
                        React.createElement("div", { className: "" }, camelize(trait.key)),
                        React.createElement("div", { className: "" }, trait.count)))); }))));
}
exports["default"] = TraitsSidebarFilter;
