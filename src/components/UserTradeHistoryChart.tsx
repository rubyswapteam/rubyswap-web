import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from 'next-themes';

export default function UserTradeHistoryChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 60, trim: 5 });
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [isShowing, setIsShowing] = useState(false);
  const { theme } = useTheme();

  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: 'rgba(0, 0, 0, 0.3)',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: '#000000',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgba(200, 0, 200, 0.5)',
  };
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );

  useEffect(() => {
    setTheme();
    setChartOptions(reset());
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
          color: themeColours.text,
        },
        backgroundColor: themeColours.background,
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
              color: themeColours.text,
            },
          },
          title: {
            style: {
              color: themeColours.text,
            },
          },
        },
      ],
      yAxis: [
        {
          labels: {
            style: {
              color: themeColours.text,
            },
          },
          title: {
            style: {
              color: themeColours.text,
            },
          },
        },
      ],
      title: {
        text: 'Trading History',
        style: {
          color: themeColours.text,
        },
        y: 40,
      },
      series: [
        {
          name: 'Sales',
          color: themeColours.primaryColour,
          data: trades?.sales,
          marker: {
            symbol: 'circle',
          },
        },
        {
          name: 'Purchases',
          color: themeColours.secondaryColour,
          data: trades?.purchases,
          marker: {
            symbol: 'circle',
          },
        },
      ],
      legend: {
        itemStyle: {
          color: themeColours.text,
        },
        itemHoverStyle: {
          color: themeColours.text,
        },
        itemHiddenStyle: {
          color: themeColours.text,
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
