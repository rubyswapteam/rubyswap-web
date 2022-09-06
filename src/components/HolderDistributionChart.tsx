import { Transition } from '@headlessui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsDrilldown from 'highcharts/modules/drilldown';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import CollectionHolderSummaryTable from './CollectionHolderSummaryTable';
import CollectionHolderWalletTable from './CollectionHolderWalletTable';
import CollectionTitleHeader from './CollectionTitleHeader';
import { trimHex } from '@/utils/nftUtils';
export default function HolderDistrbutionChart(props: any) {
  const [isShowing, setIsShowing] = useState(false);
  const [chartOptions, setChartOptions] = useState(undefined as any);
  const [holderCounts, setHolderCounts] = useState(undefined as any);
  const [holders, setHolders] = useState(undefined as any);
  const [total, setTotal] = useState(undefined as any);
  const controller = new AbortController();
  const { signal } = controller;

  const { theme } = useTheme();
  highchartsDrilldown(Highcharts);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // Highcharts.Tooltip.prototype.hide = function () {};
  const tabs = [
    { name: 'Summary', href: '#', current: true },
    { name: 'Wallets', href: '#', current: false },
    { name: 'Watchlist', href: '#', current: false },
    { name: 'Bluechips', href: '#', current: false },
  ];
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
  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    reset(props.contractAddress);
  }, [props.contractAddress]);

  useEffect(() => {
    setTheme();
    if (chartOptions) setChartOptions(JSON.parse(JSON.stringify(chartOptions)));
  }, [theme]);

  async function getHolders(contract: string) {
    const resInit = await fetch(
      `/.netlify/functions/safeGetDbCollectionHoldersByContract?contract=${contract}`,
      {
        signal: signal,
        method: 'GET',
        redirect: 'follow',
      },
    );
    const res = await resInit.json();
    controller.abort();

    if (res && res[0]) {
      console.log('res');
      console.log(res);
      const holders = res[0].data;
      const whaleCount = 25;
      const whaleHolders = res[0].data.slice(0, whaleCount);
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
          format: `<div style="display:block"><a><a style='font-weight:600'>Wallets:</a> ${
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
          format: `<div style="display:block"><a><a style='font-weight:600'>Wallets:</a> ${whaleCount}</a><br /><a style='font-weight:600'>Holdings:</a> ${whaleTotal} / (${(
            (whaleTotal / total) *
            100
          ).toFixed(2)}%)</a></div>`,
          //could be a function
        },
      ];
      const pieChartWhaleDrilldown = [];
      for (let i = 0; i < whaleHolders.length; i++) {
        pieChartWhaleDrilldown.push({
          name: trimHex(whaleHolders[i].ownerAddress),
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
      setHolders(holders);
      setHolderCounts(holderCounts);
      setTotal(total);
      setIsShowing(true);
      const newOptions = getOptions(pieChartTopLevel, pieChartWhaleDrilldown);
      setChartOptions(newOptions);
      return newOptions;
    }
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
    const holdersData = async () => {
      const result: any = await getHolders(contract);
      return result;
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
                <button
                  key={tab.name}
                  className={classNames(
                    activeTab == tab.name
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700',
                    'px-3 py-2 font-medium text-sm rounded-md',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {activeTab == 'Summary' && (
        <div className="flex h-[40vh] justify-between border-2 border-gray-100 rounded-md dark:border-white/10">
          <div className="flex flex-grow w-full">
            {holderCounts && total && (
              <CollectionHolderSummaryTable
                holderCounts={holderCounts}
                total={total}
              ></CollectionHolderSummaryTable>
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
      )}
      {activeTab == 'Wallets' && holders && (
        <div className="flex h-[40vh] justify-between border-2 border-gray-100 rounded-md dark:border-white/10">
          <div className="flex flex-grow w-full">
            {
              <CollectionHolderWalletTable
                holdersIn={holders}
                total={total}
              ></CollectionHolderWalletTable>
            }
          </div>
        </div>
      )}
    </Transition>
  );
}
