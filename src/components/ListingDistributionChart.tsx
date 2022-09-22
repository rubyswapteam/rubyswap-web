import Highcharts, * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { listingDistrbutionArray } from '../utils/nftUtils';

export default function ListingDistributionChart(props: any) {
  const [listingDistrbution] = useState(listingDistrbutionArray);
  const [isShowing, setIsShowing] = useState(false);
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
    background: 'rgba(255,255,255, 0.04)',
    text: '#ffffff',
    primaryColour: 'rgba(255, 255, 255, 0.3)',
    secondaryColour: 'rgba(234, 179, 8, 1)',
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
    if (!props.data) return;
    const listingsByMarketplace: any = {};
    const mappedData: any = {};
    const labels: string[] = [];
    const seriesData: { name: string; data: number[] }[] = [];
    const minPrice = props.data[0]?.price;
    const minIndex = Math.max(
      listingDistrbutionArray.findIndex((x: number) => x > minPrice) - 1,
      0,
    );
    const trimDistArr = listingDistrbutionArray.slice(minIndex, minIndex + 25);
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
      i == trimDistArr.length - 1
        ? labels.push(trimDistArr[i - 1] + 'Ξ+')
        : labels.push('<' + trimDistArr[i] + 'Ξ');
    }

    marketplaces.forEach((marketplace: string) =>
      seriesData.push({ name: marketplace, data: mappedData[marketplace] }),
    );

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
        height: '450px',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 125,
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
          title: {
            text: 'Listing count',
            style: {
              color: themeColours.text,
            },
          },
        },
      ],
      title: {
        text: '',
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
    };

    return options;
  }

  return (
    <div key={`${theme}-${props.data[0]?.contract}-co-shc`}>
      {(!isShowing ||
        (!props?.data && !isEmpty) ||
        (props?.data &&
          props?.data.length > 0 &&
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
      // className={
      // (isShowing &&
      // !isEmpty &&
      // props?.data &&
      // props?.data.length > 0 &&
      // props?.data[0]?.contract === props?.activeContract
      // ? ''
      // : 'hidden') + ' relative'
      // }
      >
        <HighchartsReact
          highcharts={HighCharts}
          options={chartOptions}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%' } }}
        ></HighchartsReact>
        <div className="absolute top-8 left-10">
          <div className="px-2 pt-2 rounded-md mb-3 font-medium">
            <p>Listing Distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
}
