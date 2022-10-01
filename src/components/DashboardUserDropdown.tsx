import { useWeb3Provider } from '@/contexts/Web3ProviderContext';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import EthereumIcon from './EthereumIcon';
import { useTheme } from 'next-themes';
import { CopyIcon } from './CopyIcon';

interface Props {
  address: string;
  balance: number;
}

const truncateAddress = (address: string) => {
  if (!address) return 'No Account';
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/,
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

const DashboardUserDropdown: React.FC<Props> = ({
  address,
  balance,
}): JSX.Element => {
  const { disconnect, connectWallet, activeWallet, ethBalance } =
    useWeb3Provider();
  const { theme, setTheme } = useTheme();

  function changeTheme(newTheme: string) {
    localStorage.setItem('ruby-theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <>
      <Menu as="div" className="relative w-full inline-block text-left">
        <div>
          <Menu.Button className="w-full inline-flex justify-between items-center px-2 py-2 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
            {address}
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div>
            <Menu.Items className="origin-top-right z-50 absolute flex flex-col left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none text-sm px-4">
              <div className="py-3 px-2 font-medium flex justify-between border-b text-gray-900">
                <div className="flex">Etheruem Balance</div>
                <div className="flex">
                  {`( ${balance}`}
                  <EthereumIcon width={16} height={16} />
                  {')'}
                </div>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(activeWallet);
                      }}
                      className={
                        (active
                          ? 'bg-gray-100 text-gray-900 rounded-md'
                          : 'text-gray-700') + ' flex w-full p-2 cursor-pointer'
                      }
                    >
                      <div className="mr-3">
                        <CopyIcon width="1em" height="1em" />
                      </div>
                      Copy Address
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      target="_blank"
                      href="https://ruby.canny.io/requests"
                      rel="noopener noreferrer"
                      className={
                        (active
                          ? 'bg-gray-100 text-gray-900 rounded-md'
                          : 'text-gray-700') + ' flex w-full p-2 cursor-pointer'
                      }
                    >
                      <svg
                        className="mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7l.128-39.2H112l.1 39.2zM191.4.013C89.44.326 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.031.25.094.517.125.782h160.2c.031-.265.094-.516.125-.782c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.284 191.4.013zm.6 95.997c-44.13 0-80 35.89-80 79.1c0 9.69-7.2 16.89-16 16.89s-16-7.2-16-16c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16s-7.2 15.11-16 15.11z"
                        />
                      </svg>
                      Request Features
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) =>
                    theme == 'light' ? (
                      <a
                        onClick={() => {
                          changeTheme('dark');
                        }}
                        className={
                          (active
                            ? 'bg-gray-100 text-gray-900 rounded-md'
                            : 'text-gray-700') +
                          ' flex w-full p-2 cursor-pointer'
                        }
                      >
                        <svg
                          className="mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142c3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"
                          />
                        </svg>
                        Switch To Dark Mode
                      </a>
                    ) : (
                      <a
                        onClick={() => {
                          changeTheme('light');
                        }}
                        className={
                          (active
                            ? 'bg-gray-100 text-gray-900 rounded-md'
                            : 'text-gray-700') +
                          ' flex w-full p-2 cursor-pointer'
                        }
                      >
                        <svg
                          className="mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M8 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                          />
                        </svg>
                        Switch To Light Mode
                      </a>
                    )
                  }
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => disconnect()}
                      className={
                        (active
                          ? 'bg-gray-100 text-gray-900 rounded-md'
                          : 'text-gray-700') + ' flex w-full p-2 cursor-pointer'
                      }
                    >
                      <svg
                        className="mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M288 256c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.67 14.3-32 32-32s32 14.33 32 32v224zm-208 0c0 97.2 78.8 176 176 176s176-78.8 176-176c0-54.4-24.7-103.1-63.5-135.4c-13.6-11.3-15.5-31.47-4.2-45.06c11.3-13.59 31.5-15.44 45.1-4.14c52.8 44 86.6 110.4 86.6 183.7C496 388.5 388.5 496 256 496S16 388.5 16 255.1c0-73.3 33.75-139.7 86.6-183.7c13.6-11.3 33.8-9.45 45.1 4.14c10.4 13.59 9.4 33.76-4.2 45.06C104.7 152.9 80 201.6 80 256z"
                        />
                      </svg>
                      Disconnect
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </div>
        </Transition>
      </Menu>
    </>
  );
};

export default DashboardUserDropdown;
