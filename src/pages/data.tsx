import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Data() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>data</div>}
          sidebarDetail={<div>dataDetail</div>}
        />
      </Layout>
    </>
  );
}
