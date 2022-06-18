import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Tab from '@/components/Tab';
import TrendingNftCollectionTable from '@/components/TrendingNftCollectionTable';

export default function Index() {
  const primaryTabs = [
    { name: 'Trending', href: '#', current: true },
    { name: 'Sweeps', href: '#', current: false },
    { name: 'Watchlist', href: '#', current: false },
    { name: 'Owned', href: '#', current: false },
  ];
  const secondaryTabs = [
    { name: '5m', href: '#', current: false },
    { name: '15m', href: '#', current: false },
    { name: '30m', href: '#', current: false },
    { name: '1h', href: '#', current: false },
    { name: '6h', href: '#', current: false },
    { name: '24h', href: '#', current: true },
    { name: '7d', href: '#', current: false },
    { name: '30d', href: '#', current: false },
  ];

  return (
    <>
      <Layout>
        <Dashboard
          title={'Discover'}
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={<Tab tabs={secondaryTabs} />}
          body={<TrendingNftCollectionTable/>}
        />
      </Layout>
    </>
  );
}
