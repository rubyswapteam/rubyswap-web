"use strict";
exports.__esModule = true;
var Dashboard_1 = require("@/components/Dashboard");
var Layout_1 = require("@/components/Layout");
var MintingCollectionTable_1 = require("@/components/MintingCollectionTable");
var RefreshButton_1 = require("@/components/RefreshButton");
var Tab_1 = require("@/components/Tab");
var nftUtils_1 = require("@/utils/nftUtils");
var framer_motion_1 = require("framer-motion");
var router_1 = require("next/router");
function Mints(props) {
    var router = router_1.useRouter();
    var _a = router.query, tab = _a.tab, range = _a.range;
    console.log(tab);
    var primaryTabs = [
        { name: 'Mints', href: '/', current: !tab, border: true },
        {
            name: 'Top Minters',
            href: '?tab=minters',
            current: tab == 'Minters',
            border: true,
            tooltip: true
        },
        {
            name: 'Live Mints',
            href: '?tab=watchlist',
            current: tab == 'watchlist',
            border: true,
            tooltip: true
        },
        {
            name: 'Owned',
            href: '?tab=owned',
            current: tab == 'owned',
            border: true,
            tooltip: true
        },
    ];
    function setBody() {
        if (!tab) {
            return (React.createElement("div", { className: "h-inherit overflow-scroll pb-60" },
                React.createElement(MintingCollectionTable_1["default"], null)));
        }
    }
    return (React.createElement(framer_motion_1.motion.div, { exit: { opacity: 0 }, initial: 'initial', animate: 'animate' },
        React.createElement(Layout_1["default"], null,
            React.createElement(Dashboard_1["default"], { setSearchModalState: props.setSearchModalState, title: 'Browse', primaryTabs: React.createElement(Tab_1["default"], { tabs: primaryTabs }), secondaryTabs: React.createElement(Tab_1["default"], { tabs: nftUtils_1.rangeTabs(tab, range, undefined, '30m'), condense: true }), body: setBody(), refresh: React.createElement(RefreshButton_1["default"], null) }))));
}
exports["default"] = Mints;
