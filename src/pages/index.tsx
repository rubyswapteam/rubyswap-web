import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Index() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>index</div>}
          sidebarDetail={<div>indexDetail</div>}
        />
      </Layout>
    </>
  );
}
