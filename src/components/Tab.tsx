import Link from 'next/link';
import React from 'react';

interface Props {
  tabs: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tab: React.FC<Props> = ({ tabs }): JSX.Element => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          {tabs.map((tab: any) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-3" aria-label="Tabs">
          {tabs.map((tab: any) => (
            <Link key={tab.name} href={tab.href} prefetch={false}>
              <a
                className={classNames(
                  tab.current
                    ? 'text-white bg-gradient-to-r from-red-600 to-pink-800 bg-gray-100 text-gray-700 border border-gray-300'
                    : 'text-gray-500 hover:text-gray-700 border border-gray-300',
                  'px-3 py-1 font-medium text-sm rounded-md',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tab;
