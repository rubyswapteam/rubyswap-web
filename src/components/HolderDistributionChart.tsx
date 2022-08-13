import { Transition } from '@headlessui/react';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import CollectionTitleHeader from './CollectionTitleHeader';
import CollectionHolderTable from './CollectionHolderTable';
import highchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts from 'highcharts';

export default function HolderDistrbutionChart(props: any) {
  const [daysRequired, setDaysRequired] = useState({ days: 14, trim: 1 });
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [rawData, setRawData] = useState<any[]>(undefined as any);
  const [holderCounts, setHolderCounts] = useState(undefined as any);
  const [total, setTotal] = useState(undefined as any);
  const [pcTopLevel, setPcTopLevel] = useState(undefined as any);
  const [pcWhaleDrilldown, setPcWhaleDrilldown] = useState(undefined as any);
  const { theme } = useTheme();
  highchartsDrilldown(Highcharts);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // Highcharts.Tooltip.prototype.hide = function () {};

  const lightTheme = {
    background: 'rgba(255,255,255,0.00)',
    text: '#07062C',
    primaryColour: '#333333',
    secondaryColour: 'rgb(70, 115, 250)',
  };
  const darkTheme = {
    background: 'rgba(255,255,255,0.00)',
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
          const whaleCount = 25;
          const whaleHolders = res[0].data.slice(0, whaleCount);
          console.log('whaleHolders');
          console.log(whaleHolders);
          const holderCounts = holders.reduce(
            (acc: any, curr: any) => (
              (acc[curr.tokenBalance] = (acc[curr.tokenBalance] || 0) + 1), acc
            ),
            {},
          );
          const values = Object.values(holderCounts) as number[];
          const total = holders.reduce(
            (prev: number, curr: { tokenBalance: number }) =>
              prev + curr.tokenBalance,
            0,
          );
          const whaleTotal = whaleHolders.reduce(
            (prev: number, curr: { tokenBalance: number }) =>
              prev + curr.tokenBalance,
            0,
          );
          const pieChartTopLevel = [
            {
              name: 'Remaining Holder',
              y: total - whaleTotal,
              title: 'test',
              format: `<div <div style="display:block"><a><a style='font-weight:600'>Wallets:</a> ${
                holders.length - whaleCount
              }</a><br /><a style='font-weight:600'>Holdings:</a> ${
                total - whaleTotal
              } / (${(((total - whaleTotal) / total) * 100).toFixed(
                2,
              )}%)</a></div>`,
            },
            {
              name: 'Top 25 Whale',
              y: whaleTotal,
              drilldown: 'whaleWallets',
              format: `<div <div style="display:block"><a><a style='font-weight:600'>Wallets:</a> ${whaleCount}</a><br /><a style='font-weight:600'>Holdings:</a> ${whaleTotal} / (${(
                (whaleTotal / total) *
                100
              ).toFixed(2)}%)</a></div>`,
              //could be a function
            },
          ];
          const pieChartWhaleDrilldown = [];
          for (let i = 0; i < whaleHolders.length; i++) {
            pieChartWhaleDrilldown.push({
              name: whaleHolders[i].ownerAddress,
              y: whaleHolders[i].tokenBalance,
              format: `<div style="display:block"><a><a style='font-weight:600'>Wallet:</a> ${
                whaleHolders[i].ownerAddress
              }</a><br /><a><a style='font-weight:600'>Holding:</a> ${
                whaleHolders[i].tokenBalance
              } / (${((whaleHolders[i].tokenBalance / total) * 100).toFixed(
                2,
              )}%)</a></div>`,
            });
          }

          setHolderCounts(holderCounts);
          setTotal(total);
          setPcTopLevel(pieChartTopLevel);
          setPcWhaleDrilldown(pieChartWhaleDrilldown);
          setIsShowing(true);
          const newOptions = getOptions(
            pieChartTopLevel,
            pieChartWhaleDrilldown,
          );
          setChartOptions(newOptions);
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

  function getOptions(topLevelData: any, drilldownData: any) {
    const options = {
      chart: {
        type: 'pie',
        style: {
          fontFamily: 'Biotif',
          color: themeColours.background,
        },
        backgroundColor: themeColours.background,
      },
      title: {
        text: 'Top 25 Whales:',
        style: {
          color: themeColours.text,
        },
      },
      subtitle: {
        text: 'Click the whale slice for wallet level breakdowns.',
        style: {
          color: themeColours.text,
        },
      },
      width: null,
      height: null,
      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: '%',
        },
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name} NFT count: {point.y:1f}',
            style: {
              color: themeColours.text,
            },
          },
        },
      },

      tooltip: {
        formatter: function () {
          const { format } = (this as any).point.options;
          return format;
        },
        // headerFormat:
        //   '<span style="font-size:11px">NFT Distribution</span><br>',
        // pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}% - {total}</b> of total<br/>`,
      },

      series: [
        {
          name: 'Collector:Whale Ratio',
          colorByPoint: true,
          data: topLevelData,
        },
      ],
      drilldown: {
        activeDataLabelStyle: {
          color: themeColours.text,
        },
        series: [
          {
            name: 'Top 25 Whales',
            id: 'whaleWallets',
            data: drilldownData,
          },
        ],
      },
    };

    return options;
  }

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
              defaultValue={tabs?.find((tab) => tab?.current)?.name}
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
      <div className="flex h-64 justify-between border-2 border-gray-100 rounded-md dark:border-white/10">
        <div className="flex flex-grow w-full">
          {holderCounts && total && (
            <CollectionHolderTable
              holderCounts={holderCounts}
              total={total}
            ></CollectionHolderTable>
          )}
        </div>
        <div className="flex w-full justify-center">
          <HighchartsReact
            allowChartUpdate={true}
            highcharts={Highcharts}
            options={chartOptions}
          ></HighchartsReact>
        </div>
      </div>
    </Transition>
  );
}
