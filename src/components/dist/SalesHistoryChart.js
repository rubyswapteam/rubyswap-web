"use strict";
exports.__esModule = true;
var HighCharts = require("highcharts");
var highcharts_react_official_1 = require("highcharts-react-official");
var moment_1 = require("moment");
var react_1 = require("react");
var sampleTransactions_1 = require("../data/sampleTransactions");
function SalesHistoryChart(props) {
    var _a = react_1.useState(getOptions(14)), chartOptions = _a[0], setChartOptions = _a[1];
    function getPreviousDays(daysRequired) {
        var days = [];
        var daysUnix = [];
        for (var i = daysRequired; i >= 1; i--) {
            var date = moment_1["default"]([2022, 6, 1]) //Force the date for now.
                .subtract(i, 'days')
                .format('DD/MM/YYYY');
            days.push(date);
            var unixDate = +new Date(+date.substring(6, 10), +date.substring(3, 5) - 1, +date.substring(0, 2)) / 1000;
            daysUnix.push(unixDate);
        }
        return { days: days, daysUnix: daysUnix };
    }
    function manipulateData(rawData, dates) {
        var price = rawData[0].prices;
        var timestamps = rawData[0].timestamps;
        var minimumDate = Math.min.apply(Math, dates.daysUnix);
        var priceTime = timestamps.map(function (x, i) {
            return [x, price[i]];
        });
        var priceTimeFiltered = priceTime.filter(function (x) {
            return x[0] > minimumDate;
        });
        var priceTimeAdj = priceTimeFiltered.map(function (x) {
            return [(x[0] - minimumDate) / 86400, x[1]];
        });
        return priceTimeAdj;
    }
    function getOptions(daysRequired) {
        var _a;
        var dateArray = getPreviousDays(daysRequired);
        var allocatedPrices = manipulateData(sampleTransactions_1.SampleTxns, dateArray);
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
                    categories: dateArray.days,
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
                    data: allocatedPrices
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
    return (React.createElement(highcharts_react_official_1["default"], { highcharts: HighCharts, options: chartOptions }));
}
exports["default"] = SalesHistoryChart;
