import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useState } from 'react';
import { SampleTxns } from '../data/sampleTransactions';

export default function SalesHistoryChart(props: any) {
  const [chartOptions, setChartOptions] = useState(getOptions(14));

  function getPreviousDays(daysRequired: number) {
    const days = [];
    const daysUnix = [];

    for (let i = daysRequired; i >= 1; i--) {
      const date = moment().subtract(i, 'days').format('DD/MM/YYYY');
      days.push(date);
      const unixDate =
        +new Date(
          +date.substring(6, 10),
          +date.substring(3, 5) - 1,
          +date.substring(0, 2),
        ) / 1000;
      daysUnix.push(unixDate);
    }
    return { days: days, daysUnix: daysUnix };
  }

  function manipulateData(
    rawData: any,
    dates: { days: string[]; daysUnix: number[] },
  ) {
    const price = rawData[0].prices;
    const timestamps = rawData[0].timestamps;
    const minimumDate = Math.min(...dates.daysUnix);
    const priceTime = timestamps.map(function (x: any, i: number) {
      return [x, price[i]];
    });
    const priceTimeFiltered = priceTime.filter((x: number[]) => {
      return x[0] > minimumDate;
    });
    const priceTimeAdj = priceTimeFiltered.map((x: number[]) => {
      return [(x[0] - minimumDate) / 86400, x[1]];
    });

    return priceTimeAdj;
  }

  function getOptions(daysRequired: number) {
    const dateArray = getPreviousDays(daysRequired);
    const allocatedPrices = manipulateData(SampleTxns, dateArray);

    const options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: '#ffffff',
        },
        backgroundColor: '#07062C',
        height: props.chart?.height || '60%',
        marginLeft: 80,
        marginRight: 40,
        marginTop: 80,
      },
      xAxis: [
        {
          categories: dateArray.days,
          crosshair: true,
          labels: {
            padding: 15,
            style: {
              color: '#ffffff',
            },
          },
          title: {
            style: {
              color: '#ffffff',
            },
          },
        },
      ],
      yAxis: [
        {
          labels: {
            style: {
              color: '#ffffff',
            },
          },
          title: {
            style: {
              color: '#ffffff',
            },
          },
        },
      ],
      title: {
        text: 'Sales History',
        style: {
          color: '#ffffff',
        },
        y: 40,
      },
      series: [
        {
          name: 'Sales',
          color: '#F2C94C80',
          data: allocatedPrices,
        },
      ],
      legend: {
        itemStyle: {
          color: '#FFFFFF',
        },
        itemHoverStyle: {
          color: '#FFFFFF',
        },
        itemHiddenStyle: {
          color: '#FFFFFF',
        },
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
              },
            },
          },
          states: {
            hover: {
              marker: {
                enabled: false,
              },
            },
          },
          tooltip: {
            headerFormat: '<b>Sale Price</b><br>',
            pointFormat: '{point.y} ETH',
          },
        },
      },
    };

    return options;
  }

  return (
    <HighchartsReact
      highcharts={HighCharts}
      options={chartOptions}
    ></HighchartsReact>
  );
}
