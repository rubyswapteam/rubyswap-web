import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Defi() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>marketplace</div>}
          sidebarDetail={<div>marketplaceDetail</div>}
        />
      </Layout>
    </>
  );
}
