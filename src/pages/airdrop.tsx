import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Airdrop() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>airdrop</div>}
          sidebarDetail={<div>airdropDetail</div>}
        />
      </Layout>
    </>
  );
}
