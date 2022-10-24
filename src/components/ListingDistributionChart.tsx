import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listingDistributionArray } from '../utils/nftUtils';

export default function ListingDistributionChart(props: any) {
  const [isShowing, setIsShowing] = useState(false);
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [listings, setListings] = useState<any>(undefined);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [isEmpty, setIsEmpty] = useState(false);
  const { theme } = useTheme();
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: '#333333',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255, 0.03)',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgba(234, 179, 8, 1)',
  };

  const chartColours = [
    'rgba(242, 201, 76, 0.9)',
    'rgba(234, 179, 8, 0.7)',
    'rgba(249, 115, 22, 0.7)',
    'rgba(239, 68, 68, 0.7)',
    'rgba(229, 40, 88, 0.7)',
    'rgba(215, 30, 100, 0.7)',
    'rgba(200, 20, 115, 0.7)',
    'rgba(185, 10, 130, 0.7)',
    'rgba(170, 0, 145, 0.7)',
  ];
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );
  const router = useRouter();
  const { id } = router.query;

  highchartsMore(HighCharts);

  useEffect(() => {
    setChartOptions(reset());
  }, [props.data]);

  useEffect(() => {
    console.table({ routerquery: router.query });
    setChartOptions(getOptions({ seriesData: [], labels: [] }));
    setChartOptions(reset());
  }, [id]);

  useEffect(() => {
    setTheme();
    // make sure the theme is being reset with the new chart option colours
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

  function reset() {
    const data = manipulateData();
    const newOptions = getOptions(data);
    return newOptions;
  }

  function manipulateData() {
    setListings(props.data);
    if (!props.data) return;
    const listingsByMarketplace: any = {};
    const mappedData: any = {};
    const marketplaceTotals: any = {};
    const labels: string[] = [];
    // const seriesData: { name: string; data: number[]; color: string }[] = [];
    const seriesData: any[] = [];
    const slices = props?.settings?.slices || 25;
    const minPrice = props.data[0]?.price;
    const maxPrice = props.data[props.data.length - 1]?.price;
    const minIndex = Math.max(
      listingDistributionArray.findIndex((x: number) => x > minPrice) - 1,
      0,
    );
    const maxIndexInit = Math.min(
      listingDistributionArray.findIndex((x: number) => x > maxPrice),
      minIndex + slices,
    );
    const maxIndex = maxIndexInit == -1 ? minIndex + slices : maxIndexInit;
    const finalLabel = listingDistributionArray[maxIndex];
    const trimDistArr = listingDistributionArray.slice(minIndex, maxIndex);
    props.data.forEach((x: any) => {
      Array.isArray(listingsByMarketplace[x.marketplace])
        ? listingsByMarketplace[x.marketplace].push(x.price)
        : (listingsByMarketplace[x.marketplace] = [x.price]);
    });
    const marketplaces = Object.keys(listingsByMarketplace);
    marketplaces.forEach(
      (marketplace: string) => (mappedData[marketplace] = []),
    );

    for (let i = 0; i < trimDistArr.length; i++) {
      marketplaces.forEach((marketplace: string) => {
        i == trimDistArr.length - 1
          ? mappedData[marketplace].push(
              listingsByMarketplace[marketplace].filter(
                (x: number) => x >= trimDistArr[i],
              ).length,
            )
          : mappedData[marketplace].push(
              listingsByMarketplace[marketplace].filter(
                (x: number) => x >= trimDistArr[i] && x < trimDistArr[i + 1],
              ).length,
            );
      });
      i == trimDistArr.length - 1 && trimDistArr.length == slices
        ? labels.push(listingDistributionArray[minIndex + i] + 'Ξ+')
        : labels.push('<' + listingDistributionArray[minIndex + i + 1] + 'Ξ');
    }

    marketplaces.forEach((marketplace: string) => {
      marketplaceTotals[marketplace] = mappedData[marketplace].reduce(
        (a: number, b: number) => a + b,
        0,
      );
    });
    const keysSorted = Object.keys(marketplaceTotals).sort(function (a, b) {
      return marketplaceTotals[b] - marketplaceTotals[a];
    });

    keysSorted.forEach((marketplace: string, i: number) =>
      seriesData.push({
        name: marketplace,
        data: mappedData[marketplace],
        color: chartColours[i],
      }),
    );

    seriesData.reverse();

    setIsEmpty(marketplaces.length == 0);
    setIsShowing(true);

    console.table({
      listings: props.data,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minIndex: minIndex,
      maxIndex: maxIndex,
      trimDistArr: trimDistArr,
      listingsByMarketplace: listingsByMarketplace,
      marketplaces: marketplaces,
      mappedData: mappedData,
      labels: labels,
      seriesData: seriesData,
      marketplaceTotals: marketplaceTotals,
      keysSorted: keysSorted,
    });

    return { seriesData: seriesData, labels: labels };
  }

  function getOptions(data: any) {
    const options = {
      chart: {
        type: 'column',
        zoomType: 'xy',
        style: {
          fontFamily: 'Biotif',
          color: themeColours.background,
        },
        backgroundColor: themeColours.background,
        height: props?.settings?.height || '400px',
        marginLeft: props.settings ? props?.settings?.mx : 80,
        marginRight: props.settings ? props?.settings?.mx : 40,
        marginTop: 80,
      },
      xAxis: [
        {
          categories: data.labels,
          labels: {
            enabled: props.settings ? props?.settings?.xAxis : true,
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
          gridLineColor: 'rgba(40,40,40,1)',
          title: {
            text: props.settings ? props?.settings?.yAxis : 'Listing count',
            style: {
              color: themeColours.text,
            },
          },
          labels: {
            enabled: props.settings ? props?.settings?.yAxis : true,
            style: {
              color: themeColours.text,
            },
          },
        },
      ],
      title: {
        text: '',
      },
      tooltip: {
        formatter: function (): any {
          // console.table({ this: this });
          const currentPoint = this as any,
            currentSeries = currentPoint?.series,
            currentMarketplace = currentSeries?.name,
            chart = currentSeries?.chart,
            stackName = currentSeries?.userOptions?.stack;
          let stackValues = '';

          chart.series.forEach(function (series: any) {
            series.points.forEach(function (point: any) {
              if (
                currentSeries?.userOptions?.stack ===
                  series?.userOptions?.stack &&
                currentPoint?.key === point?.category
              ) {
                stackValues += `<span style="color: ${
                  point?.color
                }">\u25CF</span> <span style="color: ${
                  series?.name == currentMarketplace
                    ? 'rgb(0,0,0); font-weight: 500;'
                    : 'rgb(100,100,100)'
                }">${series?.name}: ${point?.y}</span><br/>`;
                point.setState('hover');
              } else {
                point.setState('');
              }
            });
          });

          return (
            `<b>Listings: ${currentPoint.x}</b>` +
            '<br/>' +
            stackValues +
            `<b>Total: ${currentPoint?.point?.stackTotal}</b>`
          );
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          // groupPadding: 0.05,
          // states: {
          //   inactive: {
          //     enabled: false,
          //   },
          // },
        },
      },
      series: data.seriesData,
      legend: {
        enabled: props.settings ? props?.settings?.legend : true,
        align: 'left',
        x: 30,
        y: -10,
        margin: 20,
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
    <div key={`${theme}-${props?.data[0]?.contract}-co-ldc`}>
      {(!isShowing ||
        (!props?.data && !isEmpty) ||
        (props?.data &&
          props?.data?.length > 0 &&
          props?.data[0]?.contract !== props?.activeContract)) && (
        <div
          role="status"
          className="flex justify-center h-[450px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-white/[0.06]"
        ></div>
      )}
      {isEmpty && (
        <div className="flex justify-center items-center h-[450px] w-full bg-gray-300 rounded-lg dark:bg-white/[0.06]">
          No listings available.
        </div>
      )}
      <div
        className={
          (isShowing &&
          !isEmpty &&
          listings &&
          listings?.length > 0 &&
          listings[0]?.contract === props?.activeContract
            ? ''
            : 'hidden') + ' rounded-lg relative dark:hover:bg-white/[.02]'
        }
      >
        <HighchartsReact
          highcharts={HighCharts}
          options={chartOptions}
          // updateArgs={[true]}
          class="transition-all"
          containerProps={{
            style: {
              height: hideChart ? '75px' : '100%',
              opacity: hideChart ? '0%' : '100%',
              borderRadius: '10px',
              transitionProperty: 'all',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '200ms',
            },
          }}
          key={`${theme}-${props?.data[0]?.contract}-${id}-co-ldc-hcr`}
        ></HighchartsReact>
        {props?.settings ? (
          <>
            <div className="absolute top-5 left-5">
              <div className="text-sm px-2 pt-2 rounded-md mb-3 font-medium">
                <p>Listing walls</p>
              </div>
            </div>
            <div className="absolute top-5 right-5">
              <div
                onClick={() => setHideChart(!hideChart)}
                className="hover:bg-white/5 cursor-pointer rounded-full items-center self-center justify-center text-sm p-2 rounded-md mb-3 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute top-5 left-10">
            <div className="px-2 pt-2 rounded-md mb-3 font-medium">
              <p>Collection Listings</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
