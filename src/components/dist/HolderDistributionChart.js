"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var react_2 = require("react");
var next_themes_1 = require("next-themes");
var CollectionTitleHeader_1 = require("./CollectionTitleHeader");
function HolderDistrbutionChart(props) {
    var _a = react_2.useState({ days: 14, trim: 1 }), daysRequired = _a[0], setDaysRequired = _a[1];
    var _b = react_2.useState(false), isShowing = _b[0], setIsShowing = _b[1];
    var _c = react_2.useState(undefined), chartOptions = _c[0], setChartOptions = _c[1];
    var _d = react_2.useState(undefined), rawData = _d[0], setRawData = _d[1];
    var _e = react_2.useState(undefined), holderCounts = _e[0], setHolderCounts = _e[1];
    var _f = react_2.useState(undefined), total = _f[0], setTotal = _f[1];
    var theme = next_themes_1.useTheme().theme;
    var lightTheme = {
        background: '#ffffff',
        text: '#07062C',
        primaryColour: '#333333',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var darkTheme = {
        background: '#000000',
        text: '#ffffff',
        primaryColour: 'rgba(255,255,255,20)',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var _g = react_2.useState(theme == 'light' ? lightTheme : darkTheme), themeColours = _g[0], setThemeColours = _g[1];
    var tabs = [
        { name: 'Summary', href: '#', current: true },
        { name: 'Wallets', href: '#', current: false },
        { name: 'Watchlist', href: '#', current: false },
        { name: 'Bluechips', href: '#', current: false },
    ];
    function classNames() {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        return classes.filter(Boolean).join(' ');
    }
    react_2.useEffect(function () {
        reset(props.contractAddress);
    }, [props.contractAddress, daysRequired]);
    react_2.useEffect(function () {
        setTheme();
        if (chartOptions)
            setChartOptions(JSON.parse(JSON.stringify(chartOptions)));
    }, [theme]);
    function getHolders(contract) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/.netlify/functions/safeGetDbCollectionHoldersByContract?contract=" + contract, {
                            method: 'GET',
                            redirect: 'follow'
                        })];
                    case 1: return [4 /*yield*/, (_a.sent())
                            .json()
                            .then(function (res) {
                            console.log(res);
                            if (res && res[0]) {
                                var holders = res[0].data;
                                var whales = holders.slice(15, 0);
                                var holderCounts_1 = holders.reduce(function (acc, curr) { return ((acc[curr.tokenBalance] = (acc[curr.tokenBalance] || 0) + 1), acc); }, {});
                                var sizes = Object.keys(holderCounts_1);
                                var values = Object.values(holderCounts_1);
                                var total_1 = values.reduce(function (prev, curr) { return prev + curr; }, 0);
                                var whaleTotal = values.reduce(function (prev, curr) { return prev + curr; }, 0);
                                // const newOptions = getOptions(sizes, values);
                                // setChartOptions(newOptions);
                                setHolderCounts(holderCounts_1);
                                setTotal(total_1);
                                setIsShowing(true);
                                // setRawData(res[0]);
                            }
                        })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function setTheme() {
        if (theme == 'dark') {
            setThemeColours(darkTheme);
            return darkTheme;
        }
        if (theme == 'light') {
            setThemeColours(lightTheme);
            return lightTheme;
        }
    }
    function reset(contract) {
        var _this = this;
        console.log('reset');
        var holdersData = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getHolders(contract)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        holdersData();
    }
    // function getOptions(sizes: string[], values: number[]) {
    //   const options = {
    //     chart: {
    //       type: 'series',
    //       zoomType: 'xy',
    //       style: {
    //         fontFamily: 'Biotif',
    //         color: themeColours.background,
    //       },
    //       backgroundColor: themeColours.background,
    //       height: props.chart?.height || '60%',
    //       marginLeft: 80,
    //       marginRight: 70,
    //       marginTop: 80,
    //     },
    //     xAxis: [
    //       {
    //         categories: sizes,
    //         crosshair: true,
    //         labels: {
    //           padding: 15,
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //         title: {
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         labels: {
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //         title: {
    //           text: 'Average price',
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //       },
    //       {
    //         labels: {
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //         title: {
    //           text: 'Total Volume',
    //           style: {
    //             color: themeColours.text,
    //           },
    //         },
    //         opposite: true,
    //       },
    //     ],
    //     title: {
    //       text: 'Average Price and Volume',
    //       style: {
    //         color: themeColours.text,
    //       },
    //       y: 40,
    //     },
    //     plotOptions: {
    //       series: {
    //         marker: {
    //           enabled: false,
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: 'Volume',
    //         type: 'column',
    //         yAxis: 1,
    //         data: values,
    //         tooltip: {
    //           valueSuffix: ' ETH',
    //         },
    //         color: themeColours.primaryColour,
    //       },
    //     ],
    //     tooltip: {
    //       crosshairs: true,
    //       shared: true,
    //     },
    //     legend: {
    //       itemStyle: {
    //         color: themeColours.text,
    //       },
    //       itemHoverStyle: {
    //         color: themeColours.text,
    //       },
    //       itemHiddenStyle: {
    //         color: themeColours.text,
    //       },
    //     },
    //   };
    //   return options;
    // }
    return (React.createElement(react_1.Transition, { show: isShowing, as: "div", className: "mb-20", enter: "transition ease-out duration-1000", enterFrom: "transform opacity-0 scale-95 -translate-y-6", enterTo: "transform opacity-100 scale-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "transform opacity-100 scale-100 translate-y-0", leaveTo: "transform opacity-0 scale-95 -translate-y-6" },
        React.createElement("div", { className: "flex mb-8" },
            React.createElement(CollectionTitleHeader_1["default"], { title: 'Holder Analysis' }),
            React.createElement("div", { className: "my-auto ml-5 pt-2" },
                React.createElement("div", { className: "sm:hidden" },
                    React.createElement("label", { htmlFor: "tabs", className: "sr-only" }, "Select a tab"),
                    React.createElement("select", { id: "tabs", name: "tabs", className: "block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" }, tabs.map(function (tab) { return (React.createElement("option", { key: tab.name }, tab.name)); }))),
                React.createElement("div", { className: "hidden sm:block" },
                    React.createElement("nav", { className: "flex space-x-4", "aria-label": "Tabs" }, tabs.map(function (tab) { return (React.createElement("a", { key: tab.name, href: tab.href, className: classNames(tab.current
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md'), "aria-current": tab.current ? 'page' : undefined }, tab.name)); }))))),
        React.createElement("table", { className: "overflow-scroll inline-block rounded-md w-[50%]" },
            React.createElement("thead", { className: "flex w-full" },
                React.createElement("tr", { className: "flex w-full" },
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "NFTs Per Wallet")),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Wallets")),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Total")),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("th", { scope: "col", className: "h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4" }, "Collection %")))),
            React.createElement("tbody", { className: "h-64 overflow-scroll bg-white dark:bg-white/10 block w-full" }, holderCounts &&
                Object.keys(holderCounts).map(function (count) { return (React.createElement("tr", { key: count, className: "flex" },
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("td", { className: "h-full py-2text-sm text-gray-900 pl-4 dark:text-white/80" }, count)),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, holderCounts[count])),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, parseInt(count) * holderCounts[count]),
                        ' '),
                    React.createElement("div", { className: "w-[25%]" },
                        React.createElement("td", { className: "h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80" }, ((100 * parseInt(count) * holderCounts[count]) /
                            total).toFixed(2))))); })))));
}
exports["default"] = HolderDistrbutionChart;
