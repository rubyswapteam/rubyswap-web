"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var HighCharts = require("highcharts");
var highcharts_react_official_1 = require("highcharts-react-official");
var moment_1 = require("moment");
var react_2 = require("react");
function AveragePriceVolumeChart(props) {
    var _a = react_2.useState({ days: 60, trim: 5 }), daysRequired = _a[0], setDaysRequired = _a[1];
    var _b = react_2.useState(false), isShowing = _b[0], setIsShowing = _b[1];
    var _c = react_2.useState(undefined), chartOptions = _c[0], setChartOptions = _c[1];
    react_2.useEffect(function () {
        setChartOptions(reset());
    }, [props.data, daysRequired]);
    function roundData(x) {
        return Math.round((x + Number.EPSILON) * 100) / 100;
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
        dates.days.forEach(function (x, i) {
            var filteredPriceTime = trades.filter(function (x) { return Math.floor(x[0]) == i; });
            var volume = filteredPriceTime.reduce(function (a, b) { return a + b[1]; }, 0);
            var price = volume / filteredPriceTime.length;
            totalVolume.push(roundData(volume));
            averagePrice.push(roundData(price));
        });
        setIsShowing(true);
        return { averagePrice: averagePrice, volume: totalVolume };
    }
    function getOptions(dates, trades) {
        var _a;
        var options = {
            chart: {
                type: 'series',
                zoomType: 'xy',
                style: {
                    fontFamily: 'Biotif',
                    color: '#ffffff'
                },
                backgroundColor: '#ffffff',
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
                            color: '#07062C'
                        }
                    },
                    title: {
                        style: {
                            color: '#07062C'
                        }
                    }
                },
            ],
            yAxis: [
                {
                    labels: {
                        style: {
                            color: '#07062C'
                        }
                    },
                    title: {
                        text: 'Average price',
                        style: {
                            color: '#07062C'
                        }
                    }
                },
                {
                    labels: {
                        style: {
                            color: '#07062C'
                        }
                    },
                    title: {
                        text: 'Total Volume',
                        style: {
                            color: '#07062C'
                        }
                    },
                    opposite: true
                },
            ],
            title: {
                text: 'Average Price and Volume',
                style: {
                    color: '#07062C'
                },
                y: 40
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
                    color: '#333333'
                },
                {
                    name: 'Average Price',
                    type: 'spline',
                    data: trades === null || trades === void 0 ? void 0 : trades.averagePrice,
                    color: 'rgb(70, 115, 250)',
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
            ],
            legend: {
                itemStyle: {
                    color: '#07062C'
                },
                itemHoverStyle: {
                    color: '#07062C'
                },
                itemHiddenStyle: {
                    color: '#07062C'
                }
            }
        };
        return options;
    }
    return (React.createElement(react_1.Transition, { show: isShowing, as: "div", enter: "transition ease-out duration-1000", enterFrom: "transform opacity-0 scale-95 -translate-y-6", enterTo: "transform opacity-100 scale-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "transform opacity-100 scale-100 translate-y-0", leaveTo: "transform opacity-0 scale-95 -translate-y-6" },
        React.createElement(highcharts_react_official_1["default"], { highcharts: HighCharts, options: chartOptions })));
}
exports["default"] = AveragePriceVolumeChart;
