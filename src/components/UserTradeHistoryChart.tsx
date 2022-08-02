import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useState, useEffect, Fragment } from 'react';

export default function UserTradeHistoryChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 60, trim: 5 });
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setChartOptions(reset());
  }, [props.userTrades, daysRequired]);

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
    const data: { sales: []; purchases: [] } = props.userTrades;
    if (data && data.sales && data.purchases) {
      const minimumDate = Math.min(...dates.daysUnix);
      const sales = data.sales
        .filter((trade: any) => trade.timestamp > minimumDate)
        .map((trade: any) => [
          (trade.timestamp - minimumDate) / 86400 / trim,
          Number(trade.price),
        ]);
      const purchases = data.purchases
        .filter((trade: any) => trade.timestamp > minimumDate)
        .map((trade: any) => [
          (trade.timestamp - minimumDate) / 86400 / trim,
          Number(trade.price),
        ]);
      if (sales.length + purchases.length > 0) {
        setIsShowing(true);
      }
      return { sales: sales, purchases: purchases };
    } else {
      return { sales: [], purchases: [] };
    }
  }

  function getOptions(
    dates: any[],
    trades: { sales: any[]; purchases: any[] },
  ) {
    const options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: '#07062C',
        },
        backgroundColor: '#ffffff',
        height: props.chart?.height || '60%',
        marginLeft: 80,
        marginRight: 40,
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
            style: {
              color: '#07062C',
            },
          },
        },
      ],
      title: {
        text: 'Trading History',
        style: {
          color: '#07062C',
        },
        y: 40,
      },
      series: [
        {
          name: 'Sales',
          color: '#33333399',
          data: trades?.sales,
          marker: {
            symbol: 'circle',
          },
        },
        {
          name: 'Purchases',
          color: 'rgb(59, 130, 246)',
          data: trades?.purchases,
          marker: {
            symbol: 'circle',
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
            headerFormat: '<b>Price</b><br>',
            pointFormat: '{point.y} ETH',
          },
        },
      },
    };

    return options;
  }

  return (
    <>
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
    </>
  );
}
