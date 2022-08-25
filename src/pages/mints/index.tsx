import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import OwnedNftCollectionTable from '@/components/OwnedNftCollectionTable';
import RefreshButton from '@/components/RefreshButton';
import SweepsNftCollectionTable from '@/components/SweepsNftCollectionTable';
import Tab from '@/components/Tab';
import WatchlistNftCollectionTable from '@/components/WatchlistNftCollectionTable';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MintingCollectionTable from '@/components/MintingCollectionTable';

export default function Index(props: any) {
  const router = useRouter();
  const { tab, range } = router.query;
  console.log(tab);

  const primaryTabs = [
    { name: 'Mints', href: '/', current: !tab, border: true },
    {
      name: 'Top Minters',
      href: '?tab=minters',
      current: tab == 'Minters',
      border: true,
      tooltip: true,
    },
    {
      name: 'Live Mints',
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

  function setBody() {
    if (!tab) {
      return (
        <div className="h-inherit overflow-scroll pb-60">
          <MintingCollectionTable />
        </div>
      );
    }
  }

  return (
    <motion.div exit={{ opacity: 0 }} initial={'initial'} animate={'animate'}>
      <Layout>
        <Dashboard
          setSearchModalState={props.setSearchModalState}
          title={'Browse'}
          primaryTabs={<Tab tabs={primaryTabs} />}
          secondaryTabs={
            <Tab
              tabs={rangeTabs(tab, range, undefined, '30m')}
              condense={true}
            />
          }
          body={setBody()}
          refresh={<RefreshButton />}
        />
      </Layout>
    </motion.div>
  );
}
