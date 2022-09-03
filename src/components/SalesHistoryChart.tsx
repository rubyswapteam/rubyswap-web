import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Highcharts from 'highcharts';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SalesHistoryChart(props: any) {
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [activeTrades, setActiveTrades] = useState(undefined as any);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [rangeSeconds] = useState<any>({
    '5m': 300,
    '15m': 900,
    '30m': 1800,
    '1h': 3600,
    '6h': 21600,
    '24h': 86400,
    '7d': 604800,
    '30d': 2592000,
  });
  const { theme } = useTheme();
  const router = useRouter();
  const { range } = router.query;
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: 'rgba(0, 0, 0, 0.3)',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255, 0.04)',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgba(200, 0, 200, 0.5)',
  };
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );

  useEffect(() => {
    setTheme();
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
    setIsShowing(false);
    reset();
  }, [props.data]);

  useEffect(() => {
    reset();
  }, [range]);

  useEffect(() => {
    reset(false);
  }, [activeTrades]);

  function reset(persist = true) {
    const trades = manipulateData(persist);
    const newOptions = getOptions(trades);
    setChartOptions(newOptions);
    setIsShowing(true);
    return newOptions;
  }

  function filterOutliers(arrIn: any[], priceIndex: number) {
    if (arrIn.length > 5) {
      console.log('filterOut');
      const arr = arrIn.concat();
      arr.sort(function (a: any, b: any) {
        return a[priceIndex] - b[priceIndex];
      });
      const q1 = arr[Math.floor(arr.length / 4)][priceIndex];
      const q3 = arr[Math.ceil(arr.length * (3 / 4))][priceIndex];
      const iqr = q3 - q1;
      const maxValue = q3 + iqr * 4;
      const minValue = q1 - iqr * 1.3;
      console.log(maxValue);
      console.log(minValue);
      const filteredValues = arr.filter(function (x: any) {
        return x[priceIndex] <= maxValue && x[priceIndex] >= minValue;
      });
      return filteredValues;
    } else {
      return arrIn;
    }
  }

  function manipulateData(persist = true) {
    if (!props.data) return;
    const nowUnix = moment().unix();
    const activeTab = range?.toString() || '24h';
    const minimumDate = Math.min(nowUnix - rangeSeconds[activeTab]);
    let trades = props.data
      .filter((trade: any) => trade.timestamp > minimumDate || trade.price <= 0)
      .map((trade: any) => [
        trade.timestamp * 1000,
        Number(trade.price),
        trade.tokenId,
      ]);
    if (trades.length > 0) {
      console.log('filter');
      console.log(persist);
      trades = filterOutliers(trades, 1);
    }
    if (persist) setActiveTrades(trades);
    setIsEmpty(trades.length === 0);
    console.log(trades.length);
    return trades;
  }

  function getOptions(trades: any[]) {
    const options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: themeColours.text,
        },
        backgroundColor: themeColours.background,
        // height: '30%',
        height: '450px',
        marginLeft: 80,
        marginRight: 40,
        marginTop: 80,
      },
      xAxis: [
        {
          // categories: dates,
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
            style: {
              color: themeColours.text,
            },
          },
        },
      ],
      title: {
        text: 'Sales History',
        style: {
          color: themeColours.text,
        },
        y: 40,
      },
      series: [
        {
          name: 'Sales',
          color: themeColours.primaryColour,
          data: trades,
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
          point: {
            events: {
              click: function () {
                console.log(this);
              },
            },
          },
          marker: {
            lineWidth: 1,
            lineColor: themeColours.primaryColour,
            radius: 3,
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
            useHTML: true,
            headerFormat: '<b>Sale Details</b><br/>',
            pointFormatter: function (): string {
              const i = activeTrades && activeTrades[(this as any).index];
              const price = i && i[1];
              const time = i && i[0];
              const tokenId = i && i[2];
              let tokenIdStr = undefined;

              if ((this as any).y == price && (this as any).x == time) {
                tokenIdStr = `<div><b>Token ID:</b> ${tokenId}</div><br>`;
              } else {
                tokenIdStr = '';
              }

              return `
              </div>
              <b>Price (ETH):</b> ${(this as any).y}</div><br>
              ${tokenIdStr}
              <div><b>Time:</b> ${moment
                .unix((this as any).x / 1000)
                .format('H:mm, DD/MM')}</div>
              `;
            },
          },
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
        <HighchartsReact
          highcharts={HighCharts}
          options={chartOptions}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%' } }}
        ></HighchartsReact>
      </div>
    </div>
  );
}
