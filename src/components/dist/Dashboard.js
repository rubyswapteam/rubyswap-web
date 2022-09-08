"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/outline");
var router_1 = require("next/router");
var react_2 = require("react");
var Web3ProviderContext_1 = require("../contexts/Web3ProviderContext");
var ConnectWalletButton_1 = require("./ConnectWalletButton");
var DashboardSidebar_1 = require("./DashboardSidebar");
var DashboardSidebarBottom_1 = require("./DashboardSidebarBottom");
var DashboardSidebarFooter_1 = require("./DashboardSidebarFooter");
var DashboardUserDropdown_1 = require("./DashboardUserDropdown");
function Dashboard(props) {
    var _a, _b;
    var router = router_1.useRouter();
    var parentRoute = function () {
        return router.route.split('/')[1];
    };
    var _c = Web3ProviderContext_1.useWeb3Provider(), provider = _c.provider, connectWallet = _c.connectWallet, activeWallet = _c.activeWallet, ethBalance = _c.ethBalance;
    var _d = react_2.useState(false), sidebarOpen = _d[0], setSidebarOpen = _d[1];
    var condensedWalletName = function () {
        return activeWallet
            ? activeWallet.substring(0, 4) +
                '...' +
                activeWallet.substring(activeWallet.length - 4)
            : '';
    };
    var topNavigation = [
        { name: 'Search', header: false, search: true },
        { name: 'Personal', header: true },
        {
            name: 'Wallet',
            href: activeWallet ? "/wallet/" + activeWallet : '/',
            current: parentRoute() == 'wallet'
        },
        { name: 'Notifications', href: '/', current: false },
        { name: 'Calendar', href: '/', current: false },
        { name: 'Market', header: true },
        { name: 'Discover', href: '/', current: false },
        {
            name: 'Collections',
            href: '/',
            current: parentRoute() == 'collection' || parentRoute() == ''
        },
        { name: 'Giveaways', href: '/', current: false },
        { name: 'Minting', href: '/mints', current: parentRoute() == 'mints' },
    ];
    var bottomNavigation = [
        { name: 'Settings', href: '#', current: false },
        { name: 'Updates', href: '#', current: false },
        { name: 'Contact', href: 'https://ruby.canny.io/requests', current: false },
    ];
    function classNames() {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        return classes.filter(Boolean).join(' ');
    }
    var bannerStyle = '';
    // const bannerStyle = props?.banner
    // ? `linear-gradient(rgba(256, 256, 256, 0.4), rgba(256, 256, 256, 0.7)), url('${props?.banner}')`
    // : '';
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement(react_1.Transition.Root, { show: sidebarOpen, as: react_2.Fragment },
                React.createElement(react_1.Dialog, { as: "div", className: "relative z-40 md:hidden", onClose: setSidebarOpen },
                    React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "transition-opacity ease-linear duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "transition-opacity ease-linear duration-300", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                        React.createElement("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-75" })),
                    React.createElement("div", { className: "fixed inset-0 flex z-40" },
                        React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "transition ease-in-out duration-300 transform", enterFrom: "-translate-x-full", enterTo: "translate-x-0", leave: "transition ease-in-out duration-300 transform", leaveFrom: "translate-x-0", leaveTo: "-translate-x-full" },
                            React.createElement(react_1.Dialog.Panel, { className: "relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700" },
                                React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-in-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in-out duration-300", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                                    React.createElement("div", { className: "absolute top-0 right-0 -mr-12 pt-2" },
                                        React.createElement("button", { type: "button", className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none\n                        focus:ring-2 focus:ring-inset focus:ring-white", onClick: function () { return setSidebarOpen(false); } },
                                            React.createElement("span", { className: "sr-only" }, "Close sidebar"),
                                            React.createElement(outline_1.XIcon, { className: "h-6 w-6 text-white", "aria-hidden": "true" })))),
                                React.createElement("div", { className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto overflow-x-visible" },
                                    React.createElement("nav", { className: "mt-5 px-2 space-y-1" },
                                        React.createElement(DashboardSidebar_1["default"], { sidebarNavigation: topNavigation, classNames: classNames, setSearchModalState: props.setSearchModalState }))),
                                React.createElement("div", { className: "flex-shrink-0 flex mb-3" },
                                    React.createElement("div", { className: "flex-shrink-0 w-full group block" },
                                        React.createElement("div", { className: "flex items-center" },
                                            React.createElement("nav", { className: "mt-0 flex-1 px-2 space-y-1" },
                                                React.createElement(DashboardSidebar_1["default"], { sidebarNavigation: bottomNavigation, classNames: classNames, setSearchModalState: props.setSearchModalState }))))))),
                        React.createElement("div", { className: "flex-shrink-0 w-14", "aria-hidden": "true" })))),
            React.createElement("div", { className: "hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 drop-shadow dark:drop-shadow-md-w z-50" },
                React.createElement("div", { className: "flex-1 flex flex-col px-5 py-2 min-h-0 bg-white dark:bg-blackish" },
                    React.createElement("div", { className: "flex-1 flex flex-col pt-5 pb-4 overflow-y-auto overflow-y-visible z-50" },
                        React.createElement("nav", { className: "mt-0 flex-1 px-2" },
                            React.createElement("div", { className: "mb-5" },
                                !activeWallet && (React.createElement(ConnectWalletButton_1["default"], { connectWallet: connectWallet })),
                                activeWallet && (React.createElement(DashboardUserDropdown_1["default"], { address: condensedWalletName(), balance: ethBalance }))),
                            React.createElement(DashboardSidebar_1["default"], { sidebarNavigation: topNavigation, classNames: classNames, setSearchModalState: props.setSearchModalState }))),
                    React.createElement("div", { className: "flex-shrink-0 flex mb-3" },
                        React.createElement("div", { className: "flex-shrink-0 w-full group block" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement("nav", { className: "mt-0 flex-1 px-2 space-y-1" },
                                    React.createElement("div", { className: "mb-3 space-y-1" },
                                        React.createElement(DashboardSidebarBottom_1["default"], { sidebarNavigation: bottomNavigation, classNames: classNames })),
                                    React.createElement("div", { className: "flex items-center border-t border-gray-100 dark:border-white/10" },
                                        React.createElement(DashboardSidebarFooter_1.DashboardSidebarFooter, null)))))))),
            React.createElement("div", { className: "md:pl-56 flex flex-col flex-1" },
                React.createElement("div", { className: "sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100" },
                    React.createElement("button", { type: "button", className: "-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500\n              hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500", onClick: function () { return setSidebarOpen(true); } },
                        React.createElement("span", { className: "sr-only" }, "Open sidebar"),
                        React.createElement(outline_1.MenuIcon, { className: "h-6 w-6", "aria-hidden": "true" }))),
                React.createElement("main", { className: "flex-1" },
                    React.createElement("div", { className: 'h-screen overflow-hidden flex-col flex' },
                        React.createElement("div", { className: "py-6 bg-black/[.02] dark:bg-blackish z-10 bg-cover", style: {
                                backgroundImage: "" + bannerStyle
                            } },
                            React.createElement("div", { className: "max-w-8xl mx-auto px-4 sm:px-6 md:px-8" },
                                React.createElement("h1", { className: "text-2xl font-semibold text-black dark:text-white" }, props.title),
                                (props === null || props === void 0 ? void 0 : props.subtitle) ||
                                    (((_a = props.tab) === null || _a === void 0 ? void 0 : _a.subtitle) && (React.createElement("h1", { className: "text-sm font-medium text-black/75 dark:text-white/75" }, (props === null || props === void 0 ? void 0 : props.subtitle) || ((_b = props.tab) === null || _b === void 0 ? void 0 : _b.subtitle))))),
                            React.createElement("div", { className: "max-w-8xl mx-auto px-4 sm:px-6 md:px-8" },
                                React.createElement("div", { className: "mt-6 mb-6" }, props.primaryTabs))),
                        React.createElement("div", { className: "max-w-8xl mx-auto grow w-full h-inherit" },
                            React.createElement("div", { className: "w-full" }),
                            React.createElement("div", { className: "flex-1 flex justify-center lg:justify-end" }, (props.refresh || props.secondaryTabs) && (React.createElement("div", { className: "w-full" },
                                React.createElement("div", { className: "sm:flex sm:items-center sm:justify-between mt-6 mb-6 px-4 sm:px-6 md:px-8" },
                                    props.refresh && (React.createElement("div", { className: "flex items-center" },
                                        React.createElement("span", { className: "flex relative h-3 w-3" },
                                            React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" }),
                                            React.createElement("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-green-600" })),
                                        React.createElement("div", { className: "ml-2 pt-1 text-sm" }, "Live view"))),
                                    props.secondaryTabs && (React.createElement("div", { className: "flex" }, props.secondaryTabs)))))),
                            props.body)))))));
}
exports["default"] = Dashboard;
