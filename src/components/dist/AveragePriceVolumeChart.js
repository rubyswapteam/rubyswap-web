"use strict";
exports.__esModule = true;
var HighCharts = require("highcharts");
var highcharts_react_official_1 = require("highcharts-react-official");
var moment_1 = require("moment");
var react_1 = require("react");
var sampleTransactions_1 = require("../data/dummy-data/sampleTransactions");
function AveragePriceVolumeChart(props) {
    var _a = react_1.useState(getOptions(14)), chartOptions = _a[0], setChartOptions = _a[1];
    function roundData(x) {
        return Math.round((x + Number.EPSILON) * 100) / 100;
    }
    function getPreviousDays(daysRequired) {
        var days = [];
        var daysUnix = [];
        for (var i = daysRequired; i >= 1; i--) {
            var date = moment_1["default"]([2022, 5, 30]) //Force the date for now.
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
        var totalVolume = [];
        var averagePrice = [];
        dates.days.forEach(function (x, i) {
            var filteredPriceTime = priceTimeAdj.filter(function (x) { return Math.floor(x[0]) == i; });
            var volume = filteredPriceTime.reduce(function (a, b) { return a + b[1]; }, 0);
            var price = volume / filteredPriceTime.length;
            totalVolume.push(roundData(volume));
            averagePrice.push(roundData(price));
        });
        return { averagePrice: averagePrice, volume: totalVolume };
    }
    function getOptions(daysRequired) {
        var _a;
        var dateArray = getPreviousDays(daysRequired);
        var allocatedPrices = manipulateData(sampleTransactions_1.SampleTxns, dateArray);
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
                    data: allocatedPrices.volume,
                    tooltip: {
                        valueSuffix: ' ETH'
                    },
                    color: '#333333'
                },
                {
                    name: 'Average Price',
                    type: 'spline',
                    data: allocatedPrices.averagePrice,
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
    return (React.createElement(highcharts_react_official_1["default"], { highcharts: HighCharts, options: chartOptions }));
}
exports["default"] = AveragePriceVolumeChart;
