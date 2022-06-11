import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Settings() {
  return (
    <>
      <Layout>
        <Dashboard
          main={<div>settings</div>}
          sidebarDetail={<div>settingsDetail</div>}
        />
      </Layout>
    </>
  );
}
