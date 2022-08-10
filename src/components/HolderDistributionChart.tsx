import { Transition } from '@headlessui/react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import CollectionTitleHeader from './CollectionTitleHeader';

export default function HolderDistrbutionChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 14, trim: 1 });
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [rawData, setRawData] = useState<any[]>(undefined as any);
  const [holderCounts, setHolderCounts] = useState(undefined as any);
  const [total, setTotal] = useState(undefined as any);
  const { theme } = useTheme();
  const lightTheme = {
    background: '#ffffff',
    text: '#07062C',
    primaryColour: '#333333',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: '#000000',
    text: '#ffffff',
    primaryColour: 'rgba(255,255,255,20)',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const [themeColours, setThemeColours] = useState(
    theme == 'light' ? lightTheme : darkTheme,
  );
  const tabs = [
    { name: 'Summary', href: '#', current: true },
    { name: 'Wallets', href: '#', current: false },
    { name: 'Watchlist', href: '#', current: false },
    { name: 'Bluechips', href: '#', current: false },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    reset(props.contractAddress);
  }, [props.contractAddress, daysRequired]);

  useEffect(() => {
    setTheme();
    if (chartOptions) setChartOptions(JSON.parse(JSON.stringify(chartOptions)));
  }, [theme]);

  async function getHolders(contract: string) {
    await (
      await fetch(
        `/.netlify/functions/safeGetDbCollectionHoldersByContract?contract=${contract}`,
        {
          method: 'GET',
          redirect: 'follow',
        },
      )
    )
      .json()
      .then((res) => {
        console.log(res);
        if (res && res[0]) {
          const holders = res[0].data;
          const whales = holders.slice(15, 0);
          const holderCounts = holders.reduce(
            (acc: any, curr: any) => (
              (acc[curr.tokenBalance] = (acc[curr.tokenBalance] || 0) + 1), acc
            ),
            {},
          );
          const sizes = Object.keys(holderCounts);
          const values = Object.values(holderCounts) as number[];
          const total = values.reduce((prev, curr) => prev + curr, 0);
          const whaleTotal = values.reduce((prev, curr) => prev + curr, 0);
          // const newOptions = getOptions(sizes, values);
          // setChartOptions(newOptions);
          setHolderCounts(holderCounts);
          setTotal(total);
          setIsShowing(true);
          // setRawData(res[0]);
        }
      });
  }

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

  function reset(contract: string) {
    console.log('reset');
    const holdersData = async () => {
      return await getHolders(contract);
    };
    holdersData();
  }

  // function getOptions(sizes: string[], values: number[]) {
  //   const options = {
  //     chart: {
  //       type: 'series',
  //       zoomType: 'xy',
  //       style: {
  //         fontFamily: 'Biotif',
  //         color: themeColours.background,
  //       },
  //       backgroundColor: themeColours.background,
  //       height: props.chart?.height || '60%',
  //       marginLeft: 80,
  //       marginRight: 70,
  //       marginTop: 80,
  //     },
  //     xAxis: [
  //       {
  //         categories: sizes,
  //         crosshair: true,
  //         labels: {
  //           padding: 15,
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //         title: {
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         labels: {
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //         title: {
  //           text: 'Average price',
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //       },
  //       {
  //         labels: {
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //         title: {
  //           text: 'Total Volume',
  //           style: {
  //             color: themeColours.text,
  //           },
  //         },
  //         opposite: true,
  //       },
  //     ],
  //     title: {
  //       text: 'Average Price and Volume',
  //       style: {
  //         color: themeColours.text,
  //       },
  //       y: 40,
  //     },
  //     plotOptions: {
  //       series: {
  //         marker: {
  //           enabled: false,
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Volume',
  //         type: 'column',
  //         yAxis: 1,
  //         data: values,
  //         tooltip: {
  //           valueSuffix: ' ETH',
  //         },
  //         color: themeColours.primaryColour,
  //       },
  //     ],
  //     tooltip: {
  //       crosshairs: true,
  //       shared: true,
  //     },
  //     legend: {
  //       itemStyle: {
  //         color: themeColours.text,
  //       },
  //       itemHoverStyle: {
  //         color: themeColours.text,
  //       },
  //       itemHiddenStyle: {
  //         color: themeColours.text,
  //       },
  //     },
  //   };

  //   return options;
  // }

  return (
    <Transition
      show={isShowing}
      as="div"
      className="mb-20"
      enter="transition ease-out duration-1000"
      enterFrom="transform opacity-0 scale-95 -translate-y-6"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-95 -translate-y-6"
    >
      <div className="flex mb-8">
        <CollectionTitleHeader title={'Holder Analysis'} />
        <div className="my-auto ml-5 pt-2">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              // defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700',
                    'px-3 py-2 font-medium text-sm rounded-md',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <table className="overflow-scroll inline-block rounded-md w-[50%]">
        <thead className="flex w-full">
          <tr className="flex w-full">
            <div className="w-[25%]">
              <th
                scope="col"
                className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
              >
                NFTs Per Wallet
              </th>
            </div>
            <div className="w-[25%]">
              <th
                scope="col"
                className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
              >
                Wallets
              </th>
            </div>
            <div className="w-[25%]">
              <th
                scope="col"
                className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
              >
                Total
              </th>
            </div>
            <div className="w-[25%]">
              <th
                scope="col"
                className="h-full py-3.5 flex text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 dark:bg-white/[.03] dark:text-white pl-4"
              >
                Collection %
              </th>
            </div>
          </tr>
        </thead>
        <tbody className="h-64 overflow-scroll bg-white dark:bg-white/10 block w-full">
          {holderCounts &&
            Object.keys(holderCounts).map((count) => (
              <tr key={count} className="flex">
                <div className="w-[25%]">
                  <td className="h-full py-2text-sm text-gray-900 pl-4 dark:text-white/80">
                    {count}
                  </td>
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {holderCounts[count]}
                  </td>
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {parseInt(count) * holderCounts[count]}
                  </td>{' '}
                </div>
                <div className="w-[25%]">
                  <td className="h-full py-2 text-sm text-gray-900 pl-4 dark:text-white/80">
                    {(
                      (100 * parseInt(count) * holderCounts[count]) /
                      total
                    ).toFixed(2)}
                  </td>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
    </Transition>
  );
}
