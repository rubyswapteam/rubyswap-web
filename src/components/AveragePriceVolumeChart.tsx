import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function AveragePriceVolumeChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 60, trim: 5 });
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);

  useEffect(() => {
    setChartOptions(reset());
  }, [props.data, daysRequired]);

  function roundData(x: number) {
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }

  function reset() {
    const dates = getPreviousDays(daysRequired.days, daysRequired.trim);
    const trades = manipulateData(dates, daysRequired.trim);
    const newOptions = getOptions(dates.days, trades);
    return newOptions;
  }

  function getPreviousDays(daysRequired: number, trim: number) {
    const days = [];
    const daysUnix = [];

    for (let i = daysRequired; i >= 0; i = i - 1 * trim) {
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
    dates: { days: string[]; daysUnix: number[] },
    trim: number,
  ) {
    if (!props.data) return;
    const minimumDate = Math.min(...dates.daysUnix);
    const trades = props.data
      .filter((trade: any) => trade.timestamp > minimumDate)
      .map((trade: any) => [
        (trade.timestamp - minimumDate) / 86400 / trim,
        Number(trade.price),
      ]);

    const totalVolume: number[] = [];
    const averagePrice: number[] = [];
    dates.days.forEach((x, i) => {
      const filteredPriceTime = trades.filter(
        (x: number[]) => Math.floor(x[0]) == i,
      );
      const volume = filteredPriceTime.reduce(
        (a: number, b: number[]) => a + b[1],
        0,
      );
      const price = volume / filteredPriceTime.length;
      totalVolume.push(roundData(volume) || 0);
      averagePrice.push(roundData(price) || 0);
    });
    setIsShowing(true);

    return { averagePrice: averagePrice, volume: totalVolume };
  }

  function getOptions(
    dates: any[],
    trades?: { averagePrice: number[]; volume: number[] },
  ) {
    const options = {
      chart: {
        type: 'series',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: '#ffffff',
        },
        backgroundColor: '#ffffff',
        height: props.chart?.height || '60%',
        marginLeft: 80,
        marginRight: 70,
        marginTop: 80,
      },
      xAxis: [
        {
          categories: dates,
          crosshair: true,
          labels: {
            padding: 15,
            style: {
              color: '#07062C',
            },
          },
          title: {
            style: {
              color: '#07062C',
            },
          },
        },
      ],
      yAxis: [
        {
          labels: {
            style: {
              color: '#07062C',
            },
          },
          title: {
            text: 'Average price',
            style: {
              color: '#07062C',
            },
          },
        },
        {
          labels: {
            style: {
              color: '#07062C',
            },
          },
          title: {
            text: 'Total Volume',
            style: {
              color: '#07062C',
            },
          },
          opposite: true,
        },
      ],
      title: {
        text: 'Average Price and Volume',
        style: {
          color: '#07062C',
        },
        y: 40,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: 'Volume',
          type: 'column',
          yAxis: 1,
          data: trades?.volume,
          tooltip: {
            valueSuffix: ' ETH',
          },
          color: '#333333',
        },
        {
          name: 'Average Price',
          type: 'spline',
          data: trades?.averagePrice,
          color: 'rgb(70, 115, 250)',
          // color: {
          //   linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          //   stops: [
          //     [0, '#bd0b00'],
          //     [1, '#92124f'],
          //   ],
          // },
          tooltip: {
            valueSuffix: ' ETH',
          },
        },
      ],
      legend: {
        itemStyle: {
          color: '#07062C',
        },
        itemHoverStyle: {
          color: '#07062C',
        },
        itemHiddenStyle: {
          color: '#07062C',
        },
      },
    };

    return options;
  }

  return (
    <Transition
      show={isShowing}
      as="div"
      enter="transition ease-out duration-1000"
      enterFrom="transform opacity-0 scale-95 -translate-y-6"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-95 -translate-y-6"
    >
      <HighchartsReact
        highcharts={HighCharts}
        options={chartOptions}
      ></HighchartsReact>
    </Transition>
  );
}
