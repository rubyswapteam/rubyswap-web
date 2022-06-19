import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Tab from '@/components/Tab';
import TrendingNftCollectionTable from '@/components/TrendingNftCollectionTable';
import { useRouter } from 'next/router';
import SweepsNftCollectionTable from '@/components/SweepsNftCollectionTable';
import WatchlistNftCollectionTable from '@/components/WatchlistNftCollectionTable';

export default function Index() {
  const router = useRouter();
  const { tab, range } = router.query;

  const primaryTabs = [
    { name: 'Trending', href: '/', current: !tab },
    { name: 'Sweeps', href: '?tab=sweeps', current: tab == 'sweeps' },
    { name: 'Watchlist', href: '?tab=watchlist', current: tab == 'watchlist' },
    { name: 'Owned', href: '?tab=owned', current: tab == 'owned' },
  ];

  const secondaryTabs = [
    {
      name: '5m',
      href: tab ? `?tab=${tab}&range=5m` : '?range=5m',
      current: range == '5m',
    },
    {
      name: '15m',
      href: tab ? `?tab=${tab}&range=15m` : '?range=15m',
      current: range == '15m',
    },
    {
      name: '30m',
      href: tab ? `?tab=${tab}&range=30m` : '?range=30m',
      current: range == '30m',
    },
    {
      name: '1h',
      href: tab ? `?tab=${tab}&range=1h` : '?range=1h',
      current: range == '1h',
    },
    {
      name: '6h',
      href: tab ? `?tab=${tab}&range=6h` : '?range=6h',
      current: range == '6h',
    },
    {
      name: '24h',
      href: tab ? `?tab=${tab}` : '/',
      current: range == undefined,
    },
    {
      name: '7d',
      href: tab ? `?tab=${tab}&range=7d` : '?range=7d',
      current: range == '7d',
    },
    {
      name: '30d',
      href: tab ? `?tab=${tab}&range=30d` : '?range=30d',
      current: range == '30d',
    },
  ];

  function setBody() {
    if (!tab) {
      return <TrendingNftCollectionTable />;
    }
    if (tab === 'sweeps') {
      return <SweepsNftCollectionTable />;
    }
    if (tab === 'watchlist') {
      return <WatchlistNftCollectionTable />;
    }
  }

  return (
    <>
      <Layout>
        <Dashboard
          title={`Browse`}
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={<Tab tabs={secondaryTabs} />}
          body={setBody()}
        />
      </Layout>
    </>
  );
}
