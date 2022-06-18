import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Tab from '@/components/Tab';
import TrendingNftCollectionTable from '@/components/TrendingNftCollectionTable';

export default function Index() {
  const primaryTabs = [
    { name: 'Overview', href: '#', current: true },
    { name: 'Listings', href: '#', current: false },
    { name: 'Analytics', href: '#', current: false },
    { name: 'Traits', href: '#', current: false },
  ];

  return (
    <>
      <Layout>
        <Dashboard
          title={'Discover'}
          primaryTabs={<Tab tabs={primaryTabs} />}
          body={<TrendingNftCollectionTable/>}
        />
      </Layout>
    </>
  );
}
