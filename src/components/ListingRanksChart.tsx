import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
import moment from 'moment';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import exporting from 'highcharts/modules/exporting';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ListingRanksChart(props: any) {
  Boost(Highcharts);

  // exporting(Highcharts);
  const [isLogarithmic, setIsLogarithmic] = useState(true);
  const [applyFilter, setApplyFilter] = useState(false);
  const [counter, setCounter] = useState(0);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [activeTrades, setActiveTrades] = useState(undefined as any);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const { theme } = useTheme();
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: 'rgba(0, 0, 0, 0.3)',
    secondaryColour: 'rgb(70, 115, 250)',
    t1: 'rgba(239, 68, 68, 1)',
    t2: 'rgba(249, 115, 22, 1)',
    t3: 'rgba(234, 179, 8, 0.5)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255, 0.03)',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgba(200, 0, 200, 1)',
    t1: 'rgba(239, 68, 68, 1)',
    t2: 'rgba(249, 115, 22, 1)',
    t3: 'rgba(234, 179, 8, 0.5)',
  };
  const [themeColours, setThemeColours] = useState<any>(
    theme == 'light' ? lightTheme : darkTheme,
  );
  const [ranks, setRanks] = useState<any>(undefined);
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    setTheme();
  }, [theme]);

  useEffect(() => {
    if (
      props?.tokenRanks &&
      props?.tokenRanks?.contract === props?.activeContract
    ) {
      setRanks(props?.tokenRanks);
    } else {
      setRanks(undefined);
    }
  }, [props?.tokenRanks]);

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
    setCounter(-2);
    reset(true, true);
  }, [tab]);

  useEffect(() => {
    reset(true, true);
  }, [activeTrades]);

  function reset(persist = true, increment = false) {
    if (counter >= 2) {
      setCounter(0);
      setIsShowing(true);
      return;
    }
    if (increment) {
      setCounter((prev) => prev + 1);
    }
    if (
      props?.tokenRanks &&
      props?.tokenRanks?.contract === props?.activeContract
    ) {
      setRanks(props?.tokenRanks);
    } else {
      setRanks(undefined);
    }
    const trades = manipulateData(persist);
    const newOptions = getOptions(trades);
    setChartOptions(newOptions);
    setIsShowing(true);
    return newOptions;
  }

  function toggleFilter() {
    setApplyFilter(!applyFilter);
    reset();
  }

  function toggleScale() {
    setIsLogarithmic(!isLogarithmic);
    reset();
  }

  function filterListings(arrIn: any[]) {
    if (arrIn.length > 5) {
      const arr = arrIn.concat();
      arr.sort(function (a: any, b: any) {
        return a.y - b.y;
      });
      const q1 = arr[Math.floor(arr.length / 4)].y;
      const q3 = arr[Math.ceil(arr.length * (3 / 4))].y;
      const iqr = q3 - q1;
      const maxValue = q3 + iqr * 5;
      const minValue = q1 - iqr * 1.3;
      const filteredValues = arr.filter(function (x: any) {
        return x.y <= maxValue && x.y >= minValue;
      });
      return filteredValues;
    } else {
      return arrIn;
    }
  }

  function setKeyValues(arrIn: any[]) {
    const size = arrIn.length;
    if (size < 100) return arrIn;
    const newArr: any[] = [];
    const chunks = 20;
    const arrSorted = arrIn.sort((a, b) => a.x - b.x);
    const chunkSize = Math.floor(size / chunks);
    for (let i = 0; i < chunks; i++) {
      const arrSlice = arrIn.slice(i * chunkSize, i * (chunkSize + 1));
      const minVal = Math.min(...arrSlice.map((listing) => listing.y));
      const flteredVals = arrSlice.filter((listing) => listing.y === minVal);
      Array.prototype.push.apply(newArr, flteredVals);
    }
    return newArr;
  }

  function manipulateData(persist = true) {
    // If listings > 200 then filter for the highest rank for every x listings
    if (!props.data) return;
    const includeRanks = ranks && ranks?.contract == props?.activeContract;
    let listings = props.data;
    console.table({ listings: listings });
    listings = listings
      .map((listing: any) => {
        return {
          x: ranks?.ranks[listing.tokenId] || -999,
          y: Number(listing.price),
          id: listing.tokenId.toString(),
          contract: listing.contract,
          color:
            !ranks ||
            !ranks?.ranks[listing.tokenId] ||
            ranks?.ranks[listing.tokenId] > ranks?.tiers[2]
              ? themeColours.primaryColour
              : ranks?.ranks[listing.tokenId] > ranks?.tiers[1]
              ? themeColours?.t3
              : ranks?.ranks[listing.tokenId] > ranks?.tiers[0]
              ? themeColours?.t2
              : themeColours?.t1,
        };
      })
      .filter((x: any) => x.x > 0);
    if (listings.length > 0 && !applyFilter) {
      listings = filterListings(listings);
      listings = setKeyValues(listings);
    }
    if (persist) setActiveTrades(listings);
    setIsEmpty(listings.length === 0);
    return listings;
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
          labels: {
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
          name: 'Listing',
          color: themeColours.primaryColour,
          data: trades,
          turboThreshold: 30000,
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
              const rank = i && i?.x;
              const price = i && i?.y;
              const tokenId = i && i?.id;

              return `
              </div>
              ${rank ? `<b>Rank:</b> ${rank}</div><br>` : ''}
              ${
                (this as any).y == price && (this as any).x == rank
                  ? `<div style="padding=10px"><b>Token ID:</b> ${tokenId}</div><br>`
                  : ''
              }
              <b>Price (ETH):</b> ${(this as any).y}</div><br>
              `;
            },
          },
        },
      },
    };

    return options;
  }

  return (
    <div key={`${theme}-${props.data[0]?.contract}-co-lrc`}>
      {!isShowing ||
        (!activeTrades && !isEmpty) ||
        (activeTrades &&
          activeTrades.length > 0 &&
          Object.keys(activeTrades[0]).length >= 4 &&
          activeTrades[0].contract !== props?.activeContract && (
            <div
              role="status"
              className="flex justify-center h-[450px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-white/[0.08]"
            ></div>
          ))}
      {isEmpty && (
        <div className="flex justify-center items-center h-[450px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]">
          No listings to display.
        </div>
      )}
      <div
        className={
          (isShowing &&
          !isEmpty &&
          activeTrades &&
          activeTrades.length > 0 &&
          Object.keys(activeTrades[0]).length >= 4 &&
          activeTrades[0]?.contract === props?.activeContract
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
            <p>Listing Price By Rank</p>
          </div>
        </div>
        <div className="absolute top-8 right-10">
          <div className="flex gap-x-5">
            <div className="bg-white/5 px-2 pt-2 rounded-md mb-4">
              <label
                htmlFor="lrc-outliers"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="lrc-outliers"
                  className="sr-only peer"
                  checked={applyFilter}
                  onClick={toggleFilter}
                />
                <div className="w-6 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2.5 after:w-2.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-xs font-medium text-black/50 dark:text-white/50">
                  Filter
                </span>
              </label>
            </div>
            <div className="bg-white/5 px-1.5 pt-1.5 rounded-md mb-4">
              <label
                htmlFor="lrc-logarithmic"
                className="inline-flex relative items-center cursor-pointer p-0"
              >
                <input
                  type="checkbox"
                  value=""
                  id="lrc-logarithmic"
                  className="sr-only peer"
                  checked={isLogarithmic}
                  onClick={toggleScale}
                />
                <div className="w-6 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2.5 after:w-2.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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
