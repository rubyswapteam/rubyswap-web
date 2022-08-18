import Link from 'next/link';
import React from 'react';

interface Props {
  tabs: any;
  condense?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tab: React.FC<Props> = ({ tabs, condense }): JSX.Element => {
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
        <nav
          className={condense ? 'flex space-x-2' : 'flex space-x-2'}
          aria-label="Tabs"
        >
          {tabs.map((tab: any) => (
            <div
              key={tab.name}
              className="bg-white dark:bg-blackish bg-clip-padding rounded-md"
            >
              <Link href={tab.href} prefetch={false}>
                <a
                  className={classNames(
                    tab.current
                      ? 'text-white bg-cover bg-theme-gradient'
                      : 'text-gray-900 hover:bg-gray-100',
                    tab.border
                      ? 'dark:text-white dark:hover:bg-white/5 drop-shadow bg-clip-padding'
                      : 'dark:text-white dark:hover:bg-white/5 drop-shadow text-xs bg-clip-padding',
                    'text-sm px-3 py-1 font-medium self-center flex group rounded-md',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                  {tab?.tooltip && (
                    <div className="absolute bottom-0 flex flex-col items-center hidden w-max group-hover:flex left-1/2 -translate-x-1/2 -top-full -mt-1.5">
                      <span className="relative z-10 p-2 text-xs leading-none text-white dark:text-black whitespace-no-wrap bg-black dark:bg-white rounded-lg shadow-lg">
                        Coming soon
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-black dark:bg-white/80"></div>
                    </div>
                  )}
                </a>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tab;
