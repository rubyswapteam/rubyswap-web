"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var HighCharts = require("highcharts");
var highcharts_react_official_1 = require("highcharts-react-official");
var moment_1 = require("moment");
var react_2 = require("react");
function SalesHistoryChart(props) {
    var _a = react_2.useState({ days: 60, trim: 5 }), daysRequired = _a[0], setDaysRequired = _a[1];
    var _b = react_2.useState(undefined), chartOptions = _b[0], setChartOptions = _b[1];
    var _c = react_2.useState(false), isShowing = _c[0], setIsShowing = _c[1];
    react_2.useEffect(function () {
        setChartOptions(reset());
    }, [props.data, daysRequired]);
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
        if (trades.length > 0) {
            setIsShowing(true);
        }
        console.log(trades);
        return trades;
    }
    function getOptions(dates, trades) {
        var _a;
        var options = {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                style: {
                    fontFamily: 'Biotif',
                    color: '#07062C'
                },
                backgroundColor: '#ffffff',
                height: ((_a = props.chart) === null || _a === void 0 ? void 0 : _a.height) || '60%',
                marginLeft: 80,
                marginRight: 40,
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
                        style: {
                            color: '#07062C'
                        }
                    }
                },
            ],
            title: {
                text: 'Sales History',
                style: {
                    color: '#07062C'
                },
                y: 40
            },
            series: [
                {
                    name: 'Sales',
                    color: '#33333399',
                    data: trades
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
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>Sale Price</b><br>',
                        pointFormat: '{point.y} ETH'
                    }
                }
            }
        };
        return options;
    }
    return (React.createElement(react_1.Transition, { show: isShowing, as: "div", enter: "transition ease-out duration-1000", enterFrom: "transform opacity-0 scale-95 -translate-y-6", enterTo: "transform opacity-100 scale-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "transform opacity-100 scale-100 translate-y-0", leaveTo: "transform opacity-0 scale-95 -translate-y-6" },
        React.createElement(highcharts_react_official_1["default"], { highcharts: HighCharts, options: chartOptions })));
}
exports["default"] = SalesHistoryChart;
