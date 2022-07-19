import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';

export interface DropdownOption {
  name: string;
  icon?: any | undefined;
}

interface Props {
  options: DropdownOption[];
  defaultValue: DropdownOption;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const UserAnalyticsMarketplaceFilter: React.FC<Props> = ({
  options,
  defaultValue,
}): JSX.Element => {
  const [activeName, setActiveName] = useState<DropdownOption>(defaultValue);

  return !!options ? (
    <Menu as="div" className="relative inline-block text-left self-center">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {activeName.icon}
          {activeName.name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 whitespace-nowrap overflow-scroll min-w-56 grow max-w-100 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
          <div className="py-1 max-h-80">
            {options.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm',
                    )}
                    onClick={() => {
                      setActiveName(option);
                    }}
                  >
                    {option.icon}
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm',
                  )}
                  onClick={() => {
                    setActiveName(defaultValue);
                  }}
                >
                  <TrashIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Clear Filter
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <></>
  );
};

export default UserAnalyticsMarketplaceFilter;
