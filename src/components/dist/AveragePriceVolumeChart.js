"use strict";
exports.__esModule = true;
var highcharts_1 = require("highcharts"), HighCharts = highcharts_1;
var highcharts_react_official_1 = require("highcharts-react-official");
var highcharts_more_1 = require("highcharts/highcharts-more");
var moment_1 = require("moment");
var next_themes_1 = require("next-themes");
var router_1 = require("next/router");
var react_1 = require("react");
var react_error_boundary_1 = require("react-error-boundary");
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (React.createElement("div", { 
        // eslint-disable-next-line react/no-unknown-property
        onLoad: function () {
            resetErrorBoundary;
        }, className: "flex justify-center items-center h-[100px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]" }, 'Unable to load this chart.'));
}
function AveragePriceVolumeChart(props) {
    var _a;
    var _b = react_1.useState(false), isShowing = _b[0], setIsShowing = _b[1];
    var _c = react_1.useState(undefined), chartOptions = _c[0], setChartOptions = _c[1];
    var _d = react_1.useState(false), isEmpty = _d[0], setIsEmpty = _d[1];
    var router = router_1.useRouter();
    var range = router.query.range;
    var theme = next_themes_1.useTheme().theme;
    var rangeSettings = react_1.useState({
        '5m': { duration: 300, intervals: 60 },
        '15m': { duration: 900, intervals: 60 },
        '30m': { duration: 1800, intervals: 60 },
        '1h': { duration: 3600, intervals: 60 },
        '6h': { duration: 21600, intervals: 300 },
        '24h': { duration: 86400, intervals: 3600 },
        '7d': { duration: 604800, intervals: 3600 },
        '30d': { duration: 2592000, intervals: 86400 }
    })[0];
    var lightTheme = {
        background: '#ffffff',
        text: '#07062C',
        primaryColour: '#333333',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var darkTheme = {
        background: 'rgba(255,255,255, 0.04)',
        text: '#ffffff',
        primaryColour: 'rgba(255, 255, 255, 0.3)',
        secondaryColour: 'rgb(70, 115, 250)'
    };
    var _e = react_1.useState(theme == 'light' ? lightTheme : darkTheme), themeColours = _e[0], setThemeColours = _e[1];
    highcharts_more_1["default"](HighCharts);
    react_1.useEffect(function () {
        setIsShowing(false);
        setChartOptions(reset());
    }, [props.data]);
    react_1.useEffect(function () {
        setChartOptions(reset());
    }, [range]);
    react_1.useEffect(function () {
        setTheme();
        // make sure the theme is being reset with the new chart option colours
        if (chartOptions)
            setChartOptions(JSON.parse(JSON.stringify(chartOptions)));
    }, [theme]);
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
    function roundData(x) {
        return Math.round((x + Number.EPSILON) * 1000) / 1000;
    }
    function reset() {
        var trades = manipulateData();
        var newOptions = getOptions(trades);
        return newOptions;
    }
    function manipulateData() {
        if (!props.data)
            return;
        var nowUnix = moment_1["default"]().unix();
        var activeTab = (range === null || range === void 0 ? void 0 : range.toString()) || '30d';
        var duration = rangeSettings[activeTab].duration;
        var interval = rangeSettings[activeTab].intervals;
        var minimumDate = Math.min(nowUnix - duration);
        var trades = props.data
            .filter(function (trade) { return trade.timestamp > minimumDate; })
            .map(function (trade) { return [trade.timestamp * 1000, Number(trade.price)]; });
        var timeSlots = [];
        for (var i = 0; i < duration / interval; i++) {
            timeSlots.push((nowUnix - (i + 1) * interval) * 1000);
        }
        var totalVolume = [];
        var averagePrice = [];
        var rangeValues = [];
        var persistedTimeslots = [];
        var isNotEmpty = false;
        timeSlots.reverse().forEach(function (x) {
            var filteredTrades = trades.filter(function (txn) {
                return txn[0] > x && txn[0] < x + interval * 1000 && txn[1] > 0.0001;
            });
            var prices = filteredTrades.map(function (txn) { return txn[1]; });
            var volume = prices.reduce(function (a, b) { return a + b; }, 0);
            isNotEmpty = isNotEmpty || volume > 0;
            if (isNotEmpty) {
                var range_1 = [
                    x,
                    roundData(Math.min.apply(Math, prices)),
                    roundData(Math.max.apply(Math, prices)),
                ];
                var price = volume / prices.length;
                totalVolume.push([x, roundData(volume) || 0]);
                averagePrice.push([x, roundData(price) || 0]);
                rangeValues.push(range_1);
                persistedTimeslots.push(x);
            }
        });
        var aggVol = totalVolume.reduce(function (prev, curr) {
            return prev[1] + curr[1];
        }, 0);
        setIsEmpty(aggVol == 0);
        setIsShowing(true);
        return {
            timeSlots: persistedTimeslots,
            averagePrice: averagePrice,
            volume: totalVolume,
            range: rangeValues
        };
    }
    function getOptions(trades) {
        var options = {
            chart: {
                type: 'series',
                zoomType: 'xy',
                style: {
                    fontFamily: 'Biotif',
                    color: themeColours.background
                },
                backgroundColor: themeColours.background,
                // height: props.chart?.height || '60%',
                height: '450px',
                marginLeft: 80,
                marginRight: 70,
                marginTop: 80
            },
            xAxis: [
                {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return highcharts_1["default"].dateFormat('%d/%m/%y', this.value);
                        },
                        padding: 30,
                        style: {
                            color: themeColours.text
                        }
                    },
                    crosshair: true,
                    title: {
                        style: {
                            color: themeColours.text
                        }
                    }
                },
            ],
            yAxis: [
                {
                    startOnTick: false,
                    endOnTick: false,
                    minorTickInterval: 0.1,
                    minorGridLineColor: 'rgba(30,30,30,1)',
                    gridLineColor: 'rgb(40,40,40)',
                    lineColor: 'rgb(40,40,40)',
                    tickColor: 'rgb(40,40,40)',
                    labels: {
                        style: {
                            color: themeColours.text
                        }
                    },
                    title: {
                        text: 'Average price',
                        style: {
                            color: themeColours.text
                        }
                    }
                },
                {
                    labels: {
                        style: {
                            color: themeColours.text
                        }
                    },
                    title: {
                        text: 'Total Volume',
                        style: {
                            color: themeColours.text
                        }
                    },
                    opposite: true
                },
            ],
            title: {
                text: 'Average Price and Volume',
                style: {
                    color: themeColours.text
                },
                y: 40
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                },
                spline: {
                    connectNulls: true
                }
            },
            series: [
                {
                    name: 'Volume',
                    type: 'column',
                    yAxis: 1,
                    data: trades === null || trades === void 0 ? void 0 : trades.volume,
                    tooltip: {
                        valueSuffix: ' ETH'
                    },
                    color: themeColours.primaryColour
                },
                {
                    name: 'Average Price',
                    type: 'spline',
                    data: trades === null || trades === void 0 ? void 0 : trades.averagePrice,
                    color: themeColours.secondaryColour,
                    tooltip: {
                        valueSuffix: ' ETH'
                    }
                },
                {
                    name: 'Range',
                    data: trades === null || trades === void 0 ? void 0 : trades.range,
                    type: 'arearange',
                    lineWidth: 0,
                    linkedTo: ':previous',
                    color: 'rgba(200, 0, 200, 0.2)',
                    fillOpacity: 0.3,
                    zIndex: 0,
                    marker: {
                        enabled: false
                    },
                    tooltip: {
                        valueSuffix: ' ETH'
                    }
                },
            ],
            tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                itemStyle: {
                    color: themeColours.text
                },
                itemHoverStyle: {
                    color: themeColours.text
                },
                itemHiddenStyle: {
                    color: themeColours.text
                }
            }
        };
        return options;
    }
    return (React.createElement("div", { key: theme + "-" + ((_a = props.data[0]) === null || _a === void 0 ? void 0 : _a.contract) + "-" + (range || '24h') + "-co-shc" },
        !isShowing && (React.createElement("div", { role: "status", className: "flex justify-center h-[450px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-white/[0.06]" })),
        isEmpty && (React.createElement("div", { className: "flex justify-center items-center h-[450px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]" }, "No trades to display for this " + range + " timespan.")),
        React.createElement("div", { className: isShowing && !isEmpty ? '' : 'hidden' },
            React.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: ErrorFallback },
                React.createElement(highcharts_react_official_1["default"], { highcharts: HighCharts, options: chartOptions, updateArgs: [true], containerProps: { style: { height: '100%' } } })))));
}
exports["default"] = AveragePriceVolumeChart;
