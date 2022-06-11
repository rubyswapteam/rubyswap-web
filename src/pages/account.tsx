import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Account() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>account</div>}
          sidebarDetail={<div>searchDetail</div>}
        />
      </Layout>
    </>
  );
}
