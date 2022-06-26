import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import DashboardSidebar from './DashboardSidebar';
import RefreshButton from '@/components/RefreshButton';
import DashboardUserDropdown from './DashboardUserDropdown';

const topNavigation = [
  { name: 'Personal', header: true },
  { name: 'Wallet', href: '/', current: false },
  { name: 'Notifications', href: '/', current: false },
  { name: 'Calendar', href: '/', current: false },
  // { name: 'Personal', href: '#', current: false },
  // { name: 'Wallet', href: '#', current: false },
  // { name: 'Notifications', href: '#', current: false },
  // { name: 'Listings', href: '#', current: false },
  { name: 'Market', header: true },
  { name: 'Discover', href: '/', current: true },
  { name: 'Collections', href: '/', current: false },
  { name: 'Giveaways', href: '/', current: false },
  { name: 'Minting', href: '/', current: false },
];

const bottomNavigation = [
  { name: 'Settings', href: '#', current: false },
  { name: 'Updates', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard(props: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
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
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
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

        <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col px-5 py-2 min-h-0 border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-0 flex-1 px-2 space-y-1">
                <div className="mb-5">
                  <DashboardUserDropdown address="0xe2e....459b" />
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
                    <DashboardSidebar
                      sidebarNavigation={bottomNavigation}
                      classNames={classNames}
                    />
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
            <div className="py-6">
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {props.title}
                </h1>
              </div>
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="mt-6 mb-6">{props.primaryTabs}</div>
              </div>
              <div className="border-t w-full"></div>
              <div className="max-w-8xl mx-auto">
                <div className="w-full" />
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="w-full">
                    <div className="sm:flex sm:items-center sm:justify-between mt-6 mb-6 px-4 sm:px-6 md:px-8">
                      <div className="flex items-center">
                        <RefreshButton />
                      </div>
                      {props.secondaryTabs && (
                        <div className="flex">{props.secondaryTabs}</div>
                      )}
                    </div>
                  </div>
                </div>
                {props.body}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
