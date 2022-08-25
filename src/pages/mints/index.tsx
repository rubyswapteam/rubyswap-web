import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import MintingCollectionTable from '@/components/MintingCollectionTable';
import RefreshButton from '@/components/RefreshButton';
import Tab from '@/components/Tab';
import { rangeTabs } from '@/utils/nftUtils';
import { useRouter } from 'next/router';

export default function Mints(props: any) {
  const router = useRouter();
  const { tab, range } = router.query;

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
    <div>
      <Layout>
        <Dashboard
          setSearchModalState={props.setSearchModalState}
          title={'Mints'}
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
    </div>
  );
}
