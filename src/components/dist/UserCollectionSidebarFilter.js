"use strict";
exports.__esModule = true;
function UserCollectionSidebarFilter(props) {
    var _a, _b, _c;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white flex-col h-inherit overflow-scroll w-[20vw] px-3 pt-5 float-right drop-shadow z-0 text-sm pb-60" },
            React.createElement("div", { className: "flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer" },
                React.createElement("div", { className: "font-semibold" }, "Collections"),
                React.createElement("div", null, (_a = props.userNfts) === null || _a === void 0 ? void 0 : _a.totalCount)), (_c = (_b = props === null || props === void 0 ? void 0 : props.userNfts) === null || _b === void 0 ? void 0 : _b.summary) === null || _c === void 0 ? void 0 :
            _c.map(function (nft) { return (React.createElement("div", { key: nft.contract }, props.collectionNames && props.collectionNames[nft.contract] && (React.createElement("div", { className: 'flex justify-between p-2 mt-1 rounded-md cursor-pointer' +
                    (props.activeCollection == nft.contract
                        ? ' bg-blue-50'
                        : ' hover:bg-gray-50'), onClick: function () { return props.getCollectionNfts(nft.contract); } },
                React.createElement("div", { className: "" }, props.collectionNames[nft.contract]),
                React.createElement("div", null, nft.count))))); }))));
}
exports["default"] = UserCollectionSidebarFilter;
