import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import highchartsMore from 'highcharts/highcharts-more';

export default function AveragePriceVolumeChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 14, trim: 1 });
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const { theme } = useTheme();
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: '#333333',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255, 0.04)',
    text: '#ffffff',
    primaryColour: 'rgba(255,255,255,20)',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );
  highchartsMore(HighCharts);

  useEffect(() => {
    setChartOptions(reset());
  }, [props.data, daysRequired]);

  useEffect(() => {
    setTheme();
    // make sure the theme is being reset with the new chart option colours
    // console.log('{ ...chartOptions }');
    if (chartOptions) setChartOptions(JSON.parse(JSON.stringify(chartOptions)));
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

  function roundData(x: number) {
    return Math.round((x + Number.EPSILON) * 1000) / 1000;
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
    const rangeValues: number[][] = [];
    dates.days.forEach((x, i) => {
      const filteredPriceTime = trades.filter(
        (x: number[]) => Math.floor(x[0]) == i,
      );
      const isolatedVals = filteredPriceTime.map((x: number[]) => x[1]);
      const volume = isolatedVals.reduce((a: number, b: number) => a + b, 0);
      const range = [
        roundData(Math.min(...isolatedVals)),
        roundData(Math.max(...isolatedVals)),
      ];
      const price = volume / filteredPriceTime.length;
      totalVolume.push(roundData(volume) || 0);
      averagePrice.push(roundData(price) || 0);
      rangeValues.push(range);
    });

    setIsShowing(totalVolume.reduce((prev, curr) => prev + curr, 0) > 0);

    return {
      averagePrice: averagePrice,
      volume: totalVolume,
      range: rangeValues,
    };
  }

  function getOptions(
    dates: any[],
    trades?: { averagePrice: number[]; volume: number[]; range: number[][] },
  ) {
    const options = {
      chart: {
        type: 'series',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: themeColours.background,
        },
        backgroundColor: themeColours.background,
        // height: props.chart?.height || '60%',
        height: '450px',
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
          startOnTick: false,
          endOnTick: false,
          type: 'logarithmic',
          minorTickInterval: 0.1,
          minorGridLineColor: 'rgba(30,30,30,1)',
          gridLineColor: 'rgba(40,40,40,1)',
          labels: {
            style: {
              color: themeColours.text,
            },
          },
          title: {
            text: 'Average price',
            style: {
              color: themeColours.text,
            },
          },
        },
        {
          labels: {
            style: {
              color: themeColours.text,
            },
          },
          title: {
            text: 'Total Volume',
            style: {
              color: themeColours.text,
            },
          },
          opposite: true,
        },
      ],
      title: {
        text: 'Average Price and Volume',
        style: {
          color: themeColours.text,
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
          color: themeColours.primaryColour,
        },
        {
          name: 'Average Price',
          type: 'spline',
          data: trades?.averagePrice,
          color: themeColours.secondaryColour,
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
        {
          name: 'Range',
          data: trades?.range,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: 'rgba(200, 0, 200, 0.2)',
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' ETH',
          },
        },
      ],
      tooltip: {
        crosshairs: true,
        shared: true,
      },
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
        allowChartUpdate={true}
        highcharts={HighCharts}
        options={chartOptions}
      ></HighchartsReact>
    </Transition>
  );
}
