import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listingDistrbutionArray } from '../utils/nftUtils';

export default function ListingDistributionChart(props: any) {
  const [isShowing, setIsShowing] = useState(false);
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
    background: 'rgba(255,255,255, 0.05)',
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
  const { tab } = router.query;

  highchartsMore(HighCharts);

  useEffect(() => {
    setIsShowing(false);
    setChartOptions(reset());
  }, [props.data]);

  useEffect(() => {
    setChartOptions(reset());
  }, [tab]);

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
    const seriesData: { name: string; data: number[]; color: string }[] = [];
    const minPrice = props.data[0]?.price;
    const maxPrice = props.data[props.data.length - 1]?.price;
    const minIndex = Math.max(
      listingDistrbutionArray.findIndex((x: number) => x > minPrice) - 1,
      0,
    );
    const maxIndex = Math.min(
      listingDistrbutionArray.findIndex((x: number) => x > maxPrice),
      minIndex + 25,
    );
    const trimDistArr = listingDistrbutionArray.slice(minIndex, maxIndex);
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
      i == trimDistArr.length - 1 && trimDistArr.length == 25
        ? labels.push(trimDistArr[i - 1] + 'Ξ+')
        : labels.push('<' + trimDistArr[i] + 'Ξ');
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
      minIndex: minIndex,
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
        height: '400px',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 80,
      },
      xAxis: [
        {
          categories: data.labels,
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
          gridLineColor: 'rgba(40,40,40,1)',
          title: {
            text: 'Listing count',
            style: {
              color: themeColours.text,
            },
          },
          labels: {
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
          console.table({ this: this });
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
          states: {
            inactive: {
              enabled: false,
            },
          },
        },
      },
      series: data.seriesData,
      legend: {
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
            : 'hidden') + ' relative dark:hover:bg-white/[.02]'
        }
      >
        <HighchartsReact
          highcharts={HighCharts}
          options={chartOptions}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%' } }}
        ></HighchartsReact>
        <div className="absolute top-5 left-10">
          <div className="px-2 pt-2 rounded-md mb-3 font-medium">
            <p>Listing Walls</p>
          </div>
        </div>
      </div>
    </div>
  );
}
