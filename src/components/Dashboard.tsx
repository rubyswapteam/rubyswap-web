import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useWeb3Provider } from '../contexts/Web3ProviderContext';
import ConnectWalletButton from './ConnectWalletButton';
import DashboardSidebar from './DashboardSidebar';
import DashboardSidebarBottom from './DashboardSidebarBottom';
import { DashboardSidebarFooter } from './DashboardSidebarFooter';
import DashboardUserDropdown from './DashboardUserDropdown';

export default function Dashboard(props: any) {
  const router = useRouter();
  const path = router.pathname;

  const parentRoute = () => {
    return router.route.split('/')[1];
  };
  const { connectWallet, activeWallet, ethBalance } = useWeb3Provider();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrollable] = useState(path.startsWith('/collection'));
  const condensedWalletName = () => {
    return activeWallet
      ? activeWallet.substring(0, 4) +
          '...' +
          activeWallet.substring(activeWallet.length - 4)
      : '';
  };

  const topNavigation = [
    { name: 'Search', header: false, search: true },
    { name: 'Personal', header: true },
    {
      name: 'Wallet',
      href: activeWallet ? `/wallet/${activeWallet}` : '/',
      current: parentRoute() == 'wallet',
    },
    { name: 'Notifications', href: '/', current: false },
    { name: 'Calendar', href: '/', current: false },
    { name: 'Market', header: true },
    { name: 'Discover', href: '/', current: false },
    {
      name: 'Collections',
      href: '/',
      current: parentRoute() == 'collection' || parentRoute() == '',
    },
    { name: 'News', href: '/news', current: parentRoute() == 'news' },
    { name: 'Giveaways', href: '/', current: false },
    { name: 'Minting', href: '/mints', current: parentRoute() == 'mints' },
  ];

  const bottomNavigation = [
    { name: 'Settings', href: '#', current: false },
    { name: 'Updates', href: '#', current: false },
    { name: 'Contact', href: 'https://ruby.canny.io/requests', current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const bannerStyle = '';
  // const bannerStyle = props?.banner
  // ? `linear-gradient(rgba(256, 256, 256, 0.4), rgba(256, 256, 256, 0.7)), url('${props?.banner}')`
  // : '';

  return (
    <>
      {/* <SearchModal isOpen={false}> */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none
                        focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto overflow-x-visible">
                    <nav className="mt-5 px-2 space-y-1">
                      <DashboardSidebar
                        sidebarNavigation={topNavigation}
                        classNames={classNames}
                      />
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex mb-3">
                    <div className="flex-shrink-0 w-full group block">
                      <div className="flex items-center">
                        <nav className="mt-0 flex-1 px-2 space-y-1">
                          <DashboardSidebar
                            sidebarNavigation={bottomNavigation}
                            classNames={classNames}
                          />
                        </nav>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true" />
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 drop-shadow dark:drop-shadow-md-w z-50">
          <div className="flex-1 flex flex-col px-5 py-2 min-h-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto overflow-y-visible z-50">
              <nav className="mt-0 flex-1 px-2">
                <div className="mb-5">
                  {!activeWallet && (
                    <ConnectWalletButton connectWallet={connectWallet} />
                  )}
                  {activeWallet && (
                    <DashboardUserDropdown
                      address={condensedWalletName()}
                      balance={ethBalance}
                    />
                  )}
                </div>
                <DashboardSidebar
                  sidebarNavigation={topNavigation}
                  classNames={classNames}
                />
              </nav>
            </div>
            <div className="flex-shrink-0 flex mb-3">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <nav className="mt-0 flex-1 px-2 space-y-1">
                    <div className="mb-3 space-y-1">
                      <DashboardSidebarBottom
                        sidebarNavigation={bottomNavigation}
                        classNames={classNames}
                      />
                    </div>
                    <div className="flex items-center border-t border-gray-100 dark:border-white/10">
                      <DashboardSidebarFooter />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-56 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500
              hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div
              style={{ overflow: isScrollable ? 'scroll' : 'hidden' }}
              className={'h-screen flex-col flex'}
            >
              <div
                className="py-6 z-10 bg-cover"
                style={{
                  backgroundImage: `${bannerStyle}`,
                }}
              >
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-black dark:text-white">
                    {props.title}
                  </h1>
                  {props?.subtitle ||
                    (props.tab?.subtitle && (
                      <h1 className="text-sm font-medium text-black/75 dark:text-white/75">
                        {props?.subtitle || props.tab?.subtitle}
                      </h1>
                    ))}
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="mt-6 mb-6">{props.primaryTabs}</div>
                </div>
              </div>
              {(props.liveView || props.secondaryTabs) && (
                <div className="flex-1 flex justify-center lg:justify-end sticky top-0 z-40">
                  <div className="w-full backdrop-blur">
                    <div className="sm:flex sm:items-center sm:justify-between mt-4 mb-4 px-4 sm:px-6 md:px-8">
                      {props.liveView && (
                        <div className="flex items-center">
                          {props.pauseLiveView ? (
                            <>
                              <span className="flex relative h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                              </span>
                              <div className="ml-2 pt-1 text-sm">Paused</div>
                            </>
                          ) : (
                            <>
                              <span className="flex relative h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                              </span>
                              <div className="ml-2 pt-1 text-sm">Live view</div>
                            </>
                          )}
                        </div>
                      )}
                      {props.secondaryTabs && (
                        <div className="flex">{props.secondaryTabs}</div>
                      )}
                      {props.listingChartsIcon && (
                        <div
                          onClick={() =>
                            props.setShowListingCharts(!props.showListingCharts)
                          }
                          className={`${
                            props.showListingCharts
                              ? 'bg-white/10'
                              : 'bg-white/5'
                          } p-1 hover:bg-white/10 text-white/80 hover:text-white rounded-md cursor-pointer`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div
                className="max-w-8xl mx-auto grow w-full"
                style={{ height: isScrollable ? '' : 'inherit' }}
              >
                <div className="w-full" />
                {props.body}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
