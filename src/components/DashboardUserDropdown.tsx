import { ChevronDownIcon } from '@heroicons/react/solid';
import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface Props {
  address: string;
}

const DashboardUserDropdown: React.FC<Props> = ({ address }): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="w-full inline-flex justify-between items-center px-2 py-2 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
        {address}
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
};

export default DashboardUserDropdown;
