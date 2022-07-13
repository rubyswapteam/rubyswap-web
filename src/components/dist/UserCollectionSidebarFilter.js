"use strict";
exports.__esModule = true;
function UserCollectionSidebarFilter(props) {
    var _a, _b, _c, _d;
    // useEffect(() => {
    //   fetchAllTrendingNftCollections();
    // }, [trendingNftCollections]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white flex-col h-full w-[20vw] px-3 py-5 float-right drop-shadow z-0 text-sm" },
            React.createElement("div", { className: "flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer" },
                React.createElement("div", { className: "font-semibold" }, "Collections"),
                React.createElement("div", null, (_b = (_a = props.userNfts) === null || _a === void 0 ? void 0 : _a.rawData) === null || _b === void 0 ? void 0 : _b.length)), (_d = (_c = props.userNfts) === null || _c === void 0 ? void 0 : _c.summary) === null || _d === void 0 ? void 0 :
            _d.sort(function (a, b) {
                var _a, _b, _c, _d;
                if (((_a = props.collectionNames[a.contract]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) < ((_b = props.collectionNames[b.contract]) === null || _b === void 0 ? void 0 : _b.toLowerCase()))
                    return -1;
                if (((_c = props.collectionNames[a.contract]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) > ((_d = props.collectionNames[b.contract]) === null || _d === void 0 ? void 0 : _d.toLowerCase()))
                    return 1;
                return 0;
            }).map(function (nft) { return (React.createElement("div", { key: nft.contract }, props.collectionNames && props.collectionNames[nft.contract] && (React.createElement("div", { className: "flex justify-between p-2 mt-1 rounded-md hover:bg-gray-50 cursor-pointer", onClick: function () { return props.getCollectionNfts(nft.contract); } },
                React.createElement("div", { className: "" }, props.collectionNames[nft.contract]),
                React.createElement("div", null, nft.count))))); }))));
}
exports["default"] = UserCollectionSidebarFilter;
