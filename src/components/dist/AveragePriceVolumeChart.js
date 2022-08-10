"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var HighCharts = require("highcharts");
var highcharts_react_official_1 = require("highcharts-react-official");
var moment_1 = require("moment");
var react_2 = require("react");
var next_themes_1 = require("next-themes");
var highcharts_more_1 = require("highcharts/highcharts-more");
function AveragePriceVolumeChart(props) {
    var _a = react_2.useState({ days: 14, trim: 1 }), daysRequired = _a[0], setDaysRequired = _a[1];
    var _b = react_2.useState(false), isShowing = _b[0], setIsShowing = _b[1];
    var _c = react_2.useState(undefined), chartOptions = _c[0], setChartOptions = _c[1];
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
    var _d = react_2.useState(theme == 'light' ? lightTheme : darkTheme), themeColours = _d[0], setThemeColours = _d[1];
    highcharts_more_1["default"](HighCharts);
    react_2.useEffect(function () {
        setChartOptions(reset());
    }, [props.data, daysRequired]);
    react_2.useEffect(function () {
        setTheme();
        // console.log('{ ...chartOptions }');
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
        var dates = getPreviousDays(daysRequired.days, daysRequired.trim);
        var trades = manipulateData(dates, daysRequired.trim);
        var newOptions = getOptions(dates.days, trades);
        return newOptions;
    }
    function getPreviousDays(daysRequired, trim) {
        var days = [];
        var daysUnix = [];
        for (var i = daysRequired; i >= 0; i = i - 1 * trim) {
            var date = moment_1["default"]().subtract(i, 'days').format('DD/MM/YYYY');
            days.push(date);
            var unixDate = +new Date(+date.substring(6, 10), +date.substring(3, 5) - 1, +date.substring(0, 2)) / 1000;
            daysUnix.push(unixDate);
        }
        return { days: days, daysUnix: daysUnix };
    }
    function manipulateData(dates, trim) {
        if (!props.data)
            return;
        var minimumDate = Math.min.apply(Math, dates.daysUnix);
        var trades = props.data
            .filter(function (trade) { return trade.timestamp > minimumDate; })
            .map(function (trade) { return [
            (trade.timestamp - minimumDate) / 86400 / trim,
            Number(trade.price),
        ]; });
        var totalVolume = [];
        var averagePrice = [];
        var rangeValues = [];
        dates.days.forEach(function (x, i) {
            var filteredPriceTime = trades.filter(function (x) { return Math.floor(x[0]) == i; });
            var isolatedVals = filteredPriceTime.map(function (x) { return x[1]; });
            var volume = isolatedVals.reduce(function (a, b) { return a + b; }, 0);
            var range = [
                roundData(Math.min.apply(Math, isolatedVals)),
                roundData(Math.max.apply(Math, isolatedVals)),
            ];
            var price = volume / filteredPriceTime.length;
            totalVolume.push(roundData(volume) || 0);
            averagePrice.push(roundData(price) || 0);
            rangeValues.push(range);
        });
        setIsShowing(true);
        return {
            averagePrice: averagePrice,
            volume: totalVolume,
            range: rangeValues
        };
    }
    function getOptions(dates, trades) {
        var _a;
        var options = {
            chart: {
                type: 'series',
                zoomType: 'xy',
                style: {
                    fontFamily: 'Biotif',
                    color: themeColours.background
                },
                backgroundColor: themeColours.background,
                height: ((_a = props.chart) === null || _a === void 0 ? void 0 : _a.height) || '60%',
                marginLeft: 80,
                marginRight: 70,
                marginTop: 80
            },
            xAxis: [
                {
                    categories: dates,
                    crosshair: true,
                    labels: {
                        padding: 15,
                        style: {
                            color: themeColours.text
                        }
                    },
                    title: {
                        style: {
                            color: themeColours.text
                        }
                    }
                },
            ],
            yAxis: [
                {
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
                    // color: {
                    //   linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    //   stops: [
                    //     [0, '#bd0b00'],
                    //     [1, '#92124f'],
                    //   ],
                    // },
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
    return (React.createElement(react_1.Transition, { show: isShowing, as: "div", enter: "transition ease-out duration-1000", enterFrom: "transform opacity-0 scale-95 -translate-y-6", enterTo: "transform opacity-100 scale-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "transform opacity-100 scale-100 translate-y-0", leaveTo: "transform opacity-0 scale-95 -translate-y-6" },
        React.createElement(highcharts_react_official_1["default"], { allowChartUpdate: true, highcharts: HighCharts, options: chartOptions })));
}
exports["default"] = AveragePriceVolumeChart;
