import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
import moment from 'moment';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import exporting from 'highcharts/modules/exporting';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SalesHistoryChart(props: any) {
  Boost(Highcharts);

  // exporting(Highcharts);
  const [isLogarithmic, setIsLogarithmic] = useState(true);
  const [showOutliers, setShowOutliers] = useState(false);
  const [counter, setCounter] = useState(0);
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
  const router = useRouter();
  const { tab, range } = router.query;

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
    setCounter(-1);
    reset(true, true);
  }, [tab]);

  useEffect(() => {
    reset();
  }, [range]);

  useEffect(() => {
    reset(true, true);
  }, [activeTrades]);

  function reset(persist = true, increment = false) {
    if (counter >= 2) {
      setCounter(0);
      return;
    }
    if (increment) {
      setCounter((prev) => prev + 1);
    }
    const trades = manipulateData(persist);
    const newOptions = getOptions(trades);
    setChartOptions(newOptions);
    setIsShowing(true);
    return newOptions;
  }

  function toggleOutliers() {
    setShowOutliers(!showOutliers);
    reset();
  }

  function toggleScale() {
    setIsLogarithmic(!isLogarithmic);
    reset();
  }

  function filterOutliers(arrIn: any[], priceIndex: number) {
    if (arrIn.length > 5) {
      const arr = arrIn.concat();
      arr.sort(function (a: any, b: any) {
        return a[priceIndex] - b[priceIndex];
      });
      const q1 = arr[Math.floor(arr.length / 4)][priceIndex];
      const q3 = arr[Math.ceil(arr.length * (3 / 4))][priceIndex];
      const iqr = q3 - q1;
      const maxValue = q3 + iqr * 15;
      const minValue = q1 - iqr * 1.3;
      const filteredValues = arr.filter(function (x: any) {
        return x[priceIndex] <= maxValue && x[priceIndex] >= minValue;
      });
      return filteredValues;
    } else {
      return arrIn;
    }
  }

  function manipulateData(persist = true) {
    console.log('manipulateData');
    if (!props.data) return;
    const nowUnix = moment().unix();
    const activeTab = range?.toString() || '30d';
    const minimumDate = Math.min(nowUnix - rangeSeconds[activeTab]);
    let trades = props.data
      .filter(
        (trade: any) => trade.timestamp > minimumDate || trade.price <= 0.0001,
      )
      .map((trade: any) => [
        trade.timestamp * 1000,
        Number(trade.price),
        trade.tokenId,
        trade.contract,
      ]);
    if (trades.length > 0 && !showOutliers) {
      trades = filterOutliers(trades, 1);
    }
    if (persist) setActiveTrades(trades);
    setIsEmpty(trades.length === 0);
    return trades;
  }

  function getOptions(trades: any[]) {
    const options = {
      boost: {
        enabled: true,
        seriesThreshold: 1,
      },
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: themeColours.text,
        },
        backgroundColor: themeColours.background,
        height: '450px',
        marginLeft: 80,
        marginRight: 40,
        marginTop: 125,
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
          type: isLogarithmic ? 'logarithmic' : 'linear',
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
        text: '',
      },
      series: [
        {
          name: 'Sales',
          color: themeColours.primaryColour,
          data: trades,
        },
      ],
      legend: {
        align: 'left',
        x: 30,
        y: -10,
        margin: 40,
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
                // console.log(this);
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
    <div key={`${theme}-${props.data[0]?.contract}-${range || '24h'}-co-shc`}>
      {!isShowing ||
        (!activeTrades && !isEmpty) ||
        (activeTrades &&
          activeTrades.length > 0 &&
          activeTrades[0].length == 4 &&
          activeTrades[0][3] !== props?.activeContract && (
            <div
              role="status"
              className="flex justify-center h-[450px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-white/[0.08]"
            ></div>
          ))}
      {isEmpty && (
        <div className="flex justify-center items-center h-[450px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]">
          {`No trades to display for this ${range} timespan.`}
        </div>
      )}
      <div
        className={
          (isShowing &&
          !isEmpty &&
          activeTrades &&
          activeTrades.length > 0 &&
          activeTrades[0].length == 4 &&
          activeTrades[0][3] === props?.activeContract
            ? ''
            : 'hidden') + ' relative'
        }
      >
        <HighchartsReact
          highcharts={HighCharts}
          options={chartOptions}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%' } }}
        ></HighchartsReact>
        <div className="absolute top-8 left-10">
          <div className="px-2 pt-2 rounded-md mb-3 font-medium">
            <p>Sale History</p>
          </div>
        </div>
        <div className="absolute top-8 right-10">
          <div className="flex gap-x-5">
            <div className="bg-white/5 px-2 pt-2 rounded-md mb-3">
              <label
                htmlFor="sh-outliers"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="sh-outliers"
                  className="sr-only peer"
                  checked={showOutliers}
                  onClick={toggleOutliers}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-xs font-medium text-black/50 dark:text-white/50">
                  Outliers
                </span>
              </label>
            </div>
            <div className="bg-white/5 px-2 pt-2 rounded-md mb-3">
              <label
                htmlFor="sh-logarithmic"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="sh-logarithmic"
                  className="sr-only peer"
                  checked={isLogarithmic}
                  onClick={toggleScale}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-xs font-medium text-black/50 dark:text-white/50">
                  Logarithmic
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
