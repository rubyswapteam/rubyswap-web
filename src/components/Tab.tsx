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
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab: any) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  : 'text-gray-500 hover:text-gray-700 border-2 border-gray-300',
                'px-3 py-2 font-medium text-sm rounded-md',
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tab;
