import DashboardSidebar from '@/components/DashboardSidebar';
import {
  ChartBarIcon,
  CogIcon,
  FilterIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/solid';

const sidebarNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Account', href: '/account', icon: UserIcon, current: true },
  { name: 'Search', href: '/search', icon: SearchIcon, current: true },
  { name: 'Filter', href: '/filter', icon: FilterIcon, current: true },
  { name: 'Data', href: '/data', icon: ChartBarIcon, current: true },
  { name: 'Settings', href: '/settings', icon: CogIcon, current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard(props: any) {
  return (
    <>
      <div className="h-screen flex flex-col font-fontbiotif">
        <div className="min-h-0 flex-1 flex overflow-hidden">
          <nav
            aria-label="Sidebar"
            className="hidden md:block md:flex-shrink-0 md:bg-white md:overflow-y-auto border-t border-gray-200 border-r border-gray-200"
          >
            <DashboardSidebar
              sidebarNavigation={sidebarNavigation}
              classNames={classNames}
            />
          </nav>
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex bg-white">
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Home
              </h1>
              {props.main}
            </section>
            <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
              <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-white overflow-y-auto">
                {props.sidebarDetail}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
