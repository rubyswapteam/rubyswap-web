import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Highcharts from 'highcharts';
import { useRouter } from 'next/router';

export default function SalesHistoryChart(props: any) {
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [activeTrades, setActiveTrades] = useState(undefined as any);
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
  }, [theme]);

  useEffect(() => {
    setChartOptions(reset());
  }, [range]);

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
    setChartOptions(reset());
  }, [props.data]);

  useEffect(() => {
    setChartOptions(reset(false));
  }, [activeTrades]);

  function reset(persist = true) {
    const trades = manipulateData(persist);
    const newOptions = getOptions(trades);
    return newOptions;
  }

  function manipulateData(persist = true) {
    if (!props.data) return;
    const nowUnix = moment().unix();
    const activeTab = range?.toString() || '24h';
    const minimumDate = Math.min(nowUnix - rangeSeconds[activeTab]);
    const trades = props.data
      .filter((trade: any) => trade.timestamp > minimumDate)
      .map((trade: any) => [
        trade.timestamp * 1000,
        Number(trade.price),
        trade.tokenId,
      ]);
    if (persist) setActiveTrades(trades);
    setIsShowing(trades.length > 0);
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
        height: props.chart?.height || '60%',
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
              return Highcharts.dateFormat(
                '%a %d %b %H:%M:%S',
                (this as any).value,
              );
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
    <Transition
      key={`${theme}-${props.data[0].contract}-${range || '24h'}-co-shc`}
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
        updateArgs={[true]}
      ></HighchartsReact>
    </Transition>
  );
}
