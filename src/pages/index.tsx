import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import OwnedNftCollectionTable from '@/components/OwnedNftCollectionTable';
import RefreshButton from '@/components/RefreshButton';
import SweepsNftCollectionTable from '@/components/SweepsNftCollectionTable';
import Tab from '@/components/Tab';
import TrendingNftCollectionTable from '@/components/TrendingNftCollectionTable';
import WatchlistNftCollectionTable from '@/components/WatchlistNftCollectionTable';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Index(props: any) {
  const router = useRouter();
  const { tab, range } = router.query;

  const primaryTabs = [
    {
      name: 'Trending',
      href: '/',
      current: !tab,
      border: true,
    },
    {
      name: 'Sweeps',
      href: '?tab=sweeps',
      current: tab == 'sweeps',
      border: true,
    },
    {
      name: 'Watchlist',
      href: '?tab=watchlist',
      current: tab == 'watchlist',
      border: true,
      tooltip: true,
    },
    {
      name: 'Owned',
      href: '?tab=owned',
      current: tab == 'owned',
      border: true,
      tooltip: true,
    },
  ];

  function setSubtitle() {
    if (!tab) return 'Browse the top collections';
    if (tab == 'sweeps') return 'View the latest sweeps';
  }

  function setBody() {
    if (!tab) {
      return (
        <div className="h-inherit overflow-scroll pb-60">
          <TrendingNftCollectionTable />
        </div>
      );
    }
    if (tab === 'sweeps') {
      return <SweepsNftCollectionTable />;
    }
    if (tab === 'watchlist') {
      return <WatchlistNftCollectionTable />;
    }
    if (tab === 'owned') {
      return <OwnedNftCollectionTable />;
    }
  }

  return (
    <motion.div exit={{ opacity: 0 }} initial={'initial'} animate={'animate'}>
      <Layout>
        <Dashboard
          setSearchModalState={props.setSearchModalState}
          title={'Collections'}
          subtitle={setSubtitle()}
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={<Tab tabs={rangeTabs(tab, range)} condense={true} />}
          body={setBody()}
          refresh={<RefreshButton />}
        />
      </Layout>
    </motion.div>
  );
}
