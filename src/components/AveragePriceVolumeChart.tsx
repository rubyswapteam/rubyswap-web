import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import moment from 'moment';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div
      onLoad={() => {
        resetErrorBoundary;
      }}
      className="flex justify-center items-center h-[100px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]"
    >
      {'Unable to load this chart.'}
    </div>
  );
}

export default function AveragePriceVolumeChart(props: any) {
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const { range } = router.query;
  const { theme } = useTheme();
  const [rangeSettings] = useState<any>({
    '5m': { duration: 300, intervals: 60 },
    '15m': { duration: 900, intervals: 60 },
    '30m': { duration: 1800, intervals: 60 },
    '1h': { duration: 3600, intervals: 60 },
    '6h': { duration: 21600, intervals: 300 },
    '24h': { duration: 86400, intervals: 3600 },
    '7d': { duration: 604800, intervals: 3600 },
    '30d': { duration: 2592000, intervals: 86400 },
  });
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: '#333333',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255, 0.04)',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );
  highchartsMore(HighCharts);

  useEffect(() => {
    setIsShowing(false);
    setChartOptions(reset());
  }, [props.data]);

  useEffect(() => {
    setChartOptions(reset());
  }, [range]);

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
    const trades = manipulateData();
    const newOptions = getOptions(trades);
    return newOptions;
  }

  function manipulateData() {
    if (!props.data) return;
    const nowUnix = moment().unix();
    const activeTab = range?.toString() || '24h';
    const duration = rangeSettings[activeTab].duration;
    const interval = rangeSettings[activeTab].intervals;
    const minimumDate = Math.min(nowUnix - duration);
    const trades = props.data
      .filter((trade: any) => trade.timestamp > minimumDate)
      .map((trade: any) => [trade.timestamp * 1000, Number(trade.price)]);

    const timeSlots = [];
    for (let i = 0; i < duration / interval; i++) {
      timeSlots.push((nowUnix - (i + 1) * interval) * 1000);
    }

    const totalVolume: any[] = [];
    const averagePrice: any[] = [];
    const rangeValues: number[][] = [];
    const persistedTimeslots: number[] = [];
    let isNotEmpty = false;
    timeSlots.reverse().forEach((x: number) => {
      const filteredTrades = trades.filter(
        (txn: any) =>
          txn[0] > x && txn[0] < x + interval * 1000 && txn[1] > 0.0001,
      );
      const prices = filteredTrades.map((txn: any) => txn[1]);
      const volume = prices.reduce((a: number, b: number) => a + b, 0);
      isNotEmpty = isNotEmpty || volume > 0;
      if (isNotEmpty) {
        const range = [
          x,
          roundData(Math.min(...prices)),
          roundData(Math.max(...prices)),
        ];
        const price = volume / prices.length;
        totalVolume.push([x, roundData(volume) || 0]);
        averagePrice.push([x, roundData(price) || 0]);
        rangeValues.push(range);
        persistedTimeslots.push(x);
      }
    });
    const aggVol = totalVolume.reduce((prev, curr) => {
      return prev[1] + curr[1];
    }, 0);
    setIsEmpty(aggVol == 0);
    setIsShowing(true);
    return {
      timeSlots: persistedTimeslots,
      averagePrice: averagePrice,
      volume: totalVolume,
      range: rangeValues,
    };
  }

  function getOptions(
    trades?: any,
    //   {
    //   timeSlots: number[];
    //   averagePrice: number[];
    //   volume: number[];
    //   range: number[][];
    // }
  ) {
    console.log('trades');
    console.log(trades);
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
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%d/%m/%y', (this as any).value);
            },
            padding: 30,
            style: {
              color: themeColours.text,
            },
          },
          crosshair: true,
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
          minorTickInterval: 0.1,
          minorGridLineColor: 'rgba(30,30,30,1)',
          gridLineColor: 'rgb(40,40,40)',
          lineColor: 'rgb(40,40,40)',
          tickColor: 'rgb(40,40,40)',
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
        spline: {
          connectNulls: true,
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
    <div key={`${theme}-${props.data[0].contract}-${range || '24h'}-co-shc`}>
      {!isShowing && (
        <div
          role="status"
          className="flex justify-center h-[450px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-white/[0.06]"
        ></div>
      )}
      {isEmpty && (
        <div className="flex justify-center items-center h-[450px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]">
          {`No trades to display for this ${range} timespan.`}
        </div>
      )}
      <div className={isShowing && !isEmpty ? '' : 'hidden'}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HighchartsReact
            highcharts={HighCharts}
            options={chartOptions}
            updateArgs={[true]}
            containerProps={{ style: { height: '100%' } }}
          ></HighchartsReact>
        </ErrorBoundary>
      </div>
    </div>
  );
}
