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
var highcharts_react_official_1 = require("highcharts-react-official");
var react_2 = require("react");
var next_themes_1 = require("next-themes");
var CollectionTitleHeader_1 = require("./CollectionTitleHeader");
var CollectionHolderTable_1 = require("./CollectionHolderTable");
var drilldown_1 = require("highcharts/modules/drilldown");
var highcharts_1 = require("highcharts");
function HolderDistrbutionChart(props) {
    var _a;
    var _b = react_2.useState({ days: 14, trim: 1 }), daysRequired = _b[0], setDaysRequired = _b[1];
    var _c = react_2.useState(false), isShowing = _c[0], setIsShowing = _c[1];
    var _d = react_2.useState(undefined), chartOptions = _d[0], setChartOptions = _d[1];
    var _e = react_2.useState(undefined), rawData = _e[0], setRawData = _e[1];
    var _f = react_2.useState(undefined), holderCounts = _f[0], setHolderCounts = _f[1];
    var _g = react_2.useState(undefined), total = _g[0], setTotal = _g[1];
    var _h = react_2.useState(undefined), pcTopLevel = _h[0], setPcTopLevel = _h[1];
    var _j = react_2.useState(undefined), pcWhaleDrilldown = _j[0], setPcWhaleDrilldown = _j[1];
    var theme = next_themes_1.useTheme().theme;
    drilldown_1["default"](highcharts_1["default"]);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // Highcharts.Tooltip.prototype.hide = function () {};
    var lightTheme = {
        background: 'rgba(255,255,255,0.00)',
        text: '#07062C',
        primaryColour: '#333333',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var darkTheme = {
        background: 'rgba(255,255,255,0.00)',
        text: '#ffffff',
        primaryColour: 'rgba(255,255,255,20)',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var _k = react_2.useState(theme == 'light' ? lightTheme : darkTheme), themeColours = _k[0], setThemeColours = _k[1];
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
                                var whaleCount = 25;
                                var whaleHolders = res[0].data.slice(0, whaleCount);
                                console.log('whaleHolders');
                                console.log(whaleHolders);
                                var holderCounts_1 = holders.reduce(function (acc, curr) { return ((acc[curr.tokenBalance] = (acc[curr.tokenBalance] || 0) + 1), acc); }, {});
                                var values = Object.values(holderCounts_1);
                                var total_1 = holders.reduce(function (prev, curr) {
                                    return prev + curr.tokenBalance;
                                }, 0);
                                var whaleTotal = whaleHolders.reduce(function (prev, curr) {
                                    return prev + curr.tokenBalance;
                                }, 0);
                                var pieChartTopLevel = [
                                    {
                                        name: 'Remaining Holder',
                                        y: total_1 - whaleTotal,
                                        title: 'test',
                                        format: "<div <div style=\"display:block\"><a><a style='font-weight:600'>Wallets:</a> " + (holders.length - whaleCount) + "</a><br /><a style='font-weight:600'>Holdings:</a> " + (total_1 - whaleTotal) + " / (" + (((total_1 - whaleTotal) / total_1) * 100).toFixed(2) + "%)</a></div>"
                                    },
                                    {
                                        name: 'Top 25 Whale',
                                        y: whaleTotal,
                                        drilldown: 'whaleWallets',
                                        format: "<div <div style=\"display:block\"><a><a style='font-weight:600'>Wallets:</a> " + whaleCount + "</a><br /><a style='font-weight:600'>Holdings:</a> " + whaleTotal + " / (" + ((whaleTotal / total_1) *
                                            100).toFixed(2) + "%)</a></div>"
                                    },
                                ];
                                var pieChartWhaleDrilldown = [];
                                for (var i = 0; i < whaleHolders.length; i++) {
                                    pieChartWhaleDrilldown.push({
                                        name: whaleHolders[i].ownerAddress,
                                        y: whaleHolders[i].tokenBalance,
                                        format: "<div style=\"display:block\"><a><a style='font-weight:600'>Wallet:</a> " + whaleHolders[i].ownerAddress + "</a><br /><a><a style='font-weight:600'>Holding:</a> " + whaleHolders[i].tokenBalance + " / (" + ((whaleHolders[i].tokenBalance / total_1) * 100).toFixed(2) + "%)</a></div>"
                                    });
                                }
                                setHolderCounts(holderCounts_1);
                                setTotal(total_1);
                                setPcTopLevel(pieChartTopLevel);
                                setPcWhaleDrilldown(pieChartWhaleDrilldown);
                                setIsShowing(true);
                                var newOptions = getOptions(pieChartTopLevel, pieChartWhaleDrilldown);
                                setChartOptions(newOptions);
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
    function getOptions(topLevelData, drilldownData) {
        var options = {
            chart: {
                type: 'pie',
                style: {
                    fontFamily: 'Biotif',
                    color: themeColours.background
                },
                backgroundColor: themeColours.background
            },
            title: {
                text: 'Top 25 Whales:',
                style: {
                    color: themeColours.text
                }
            },
            subtitle: {
                text: 'Click the whale slice for wallet level breakdowns.',
                style: {
                    color: themeColours.text
                }
            },
            width: null,
            height: null,
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} NFT count: {point.y:1f}',
                        style: {
                            color: themeColours.text
                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    var format = this.point.options.format;
                    return format;
                }
            },
            series: [
                {
                    name: 'Collector:Whale Ratio',
                    colorByPoint: true,
                    data: topLevelData
                },
            ],
            drilldown: {
                activeDataLabelStyle: {
                    color: themeColours.text
                },
                series: [
                    {
                        name: 'Top 25 Whales',
                        id: 'whaleWallets',
                        data: drilldownData
                    },
                ]
            }
        };
        return options;
    }
    return (React.createElement(react_1.Transition, { show: isShowing, as: "div", className: "mb-20", enter: "transition ease-out duration-1000", enterFrom: "transform opacity-0 scale-95 -translate-y-6", enterTo: "transform opacity-100 scale-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "transform opacity-100 scale-100 translate-y-0", leaveTo: "transform opacity-0 scale-95 -translate-y-6" },
        React.createElement("div", { className: "flex mb-8" },
            React.createElement(CollectionTitleHeader_1["default"], { title: 'Holder Analysis' }),
            React.createElement("div", { className: "my-auto ml-5 pt-2" },
                React.createElement("div", { className: "sm:hidden" },
                    React.createElement("label", { htmlFor: "tabs", className: "sr-only" }, "Select a tab"),
                    React.createElement("select", { id: "tabs", name: "tabs", className: "block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md", defaultValue: (_a = tabs === null || tabs === void 0 ? void 0 : tabs.find(function (tab) { return tab === null || tab === void 0 ? void 0 : tab.current; })) === null || _a === void 0 ? void 0 : _a.name }, tabs.map(function (tab) { return (React.createElement("option", { key: tab.name }, tab.name)); }))),
                React.createElement("div", { className: "hidden sm:block" },
                    React.createElement("nav", { className: "flex space-x-4", "aria-label": "Tabs" }, tabs.map(function (tab) { return (React.createElement("a", { key: tab.name, href: tab.href, className: classNames(tab.current
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md'), "aria-current": tab.current ? 'page' : undefined }, tab.name)); }))))),
        React.createElement("div", { className: "flex h-64 justify-between border-2 border-gray-100 dark:border-white/10" },
            React.createElement("div", { className: "flex flex-grow w-full" }, holderCounts && total && (React.createElement(CollectionHolderTable_1["default"], { holderCounts: holderCounts, total: total }))),
            React.createElement("div", { className: "flex w-full justify-center" },
                React.createElement(highcharts_react_official_1["default"], { allowChartUpdate: true, highcharts: highcharts_1["default"], options: chartOptions })))));
}
exports["default"] = HolderDistrbutionChart;
