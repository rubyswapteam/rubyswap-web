import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Tab from '@/components/Tab';
import TrendingNftCollectionTable from '@/components/TrendingNftCollectionTable';
import { useRouter } from 'next/router';
import SweepsNftCollectionTable from '@/components/SweepsNftCollectionTable';
import WatchlistNftCollectionTable from '@/components/WatchlistNftCollectionTable';
import { rangeTabs } from '@/utils/nftUtils';

export default function Index() {
  const router = useRouter();
  const { tab, range } = router.query;

  const primaryTabs = [
    { name: 'Trending', href: '/', current: !tab },
    { name: 'Sweeps', href: '?tab=sweeps', current: tab == 'sweeps' },
    { name: 'Watchlist', href: '?tab=watchlist', current: tab == 'watchlist' },
    { name: 'Owned', href: '?tab=owned', current: tab == 'owned' },
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
          secondaryTabs={<Tab tabs={rangeTabs(tab, range)} />}
          body={setBody()}
        />
      </Layout>
    </>
  );
}
