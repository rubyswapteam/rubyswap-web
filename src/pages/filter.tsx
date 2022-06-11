import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Filter() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>filter</div>}
          sidebarDetail={<div>filterDetail</div>}
        />
      </Layout>
    </>
  );
}
