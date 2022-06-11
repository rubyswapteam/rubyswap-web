import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Search() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>search</div>}
          sidebarDetail={<div>searchDetail</div>}
        />
      </Layout>
    </>
  );
}
