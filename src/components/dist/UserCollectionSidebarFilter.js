"use strict";
exports.__esModule = true;
var react_1 = require("react");
function UserCollectionSidebarFilter(props) {
    var _a, _b, _c, _d;
    var _e = react_1.useState((_a = props === null || props === void 0 ? void 0 : props.userNfts) === null || _a === void 0 ? void 0 : _a.summary), summary = _e[0], setSummary = _e[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white flex-col h-inherit overflow-scroll w-[20vw] px-3 py-5 float-right drop-shadow z-0 text-sm" },
            React.createElement("div", { className: "flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer" },
                React.createElement("div", { className: "font-semibold" }, "Collections"),
                React.createElement("div", null, (_b = props.userNfts) === null || _b === void 0 ? void 0 : _b.totalCount)), (_d = (_c = props === null || props === void 0 ? void 0 : props.userNfts) === null || _c === void 0 ? void 0 : _c.summary) === null || _d === void 0 ? void 0 :
            _d.map(function (nft) { return (React.createElement("div", { key: nft.contract }, props.collectionNames && props.collectionNames[nft.contract] && (React.createElement("div", { className: "flex justify-between p-2 mt-1 rounded-md hover:bg-gray-50 cursor-pointer", onClick: function () { return props.getCollectionNfts(nft.contract); } },
                React.createElement("div", { className: "" }, props.collectionNames[nft.contract]),
                React.createElement("div", null, nft.count))))); }))));
}
exports["default"] = UserCollectionSidebarFilter;
