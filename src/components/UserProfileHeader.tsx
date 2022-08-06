import React from 'react';
import VerifiedBadgeIcon from '@/components/VerifiedBadgeIcon';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface Props {
  name?: string;
  wallet?: string;
  image?: string;
}

const UserProfileHeader: React.FC<Props> = ({
  name,
  wallet,
  image = '',
}): JSX.Element => {
  return (
    <>
      <div className="mb-4 md:mb-0 flex-col w-full z-5 pb-6">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="flex flex-col">
            <div className="flex items-center flex-shrink-1 truncate">
              <div className="flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                {wallet && (
                  <Jazzicon diameter={50} seed={jsNumberForAddress(wallet)} />
                )}
              </div>
              <div className="ml-2">
                <div className="flex">
                  <div className="truncate text-2xl font-semibold text-gray-700 dark:text-white">
                    {name}
                  </div>
                  <span className="ml-2">
                    <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-blue rounded-full">
                      <VerifiedBadgeIcon height={30} width={30} />
                    </div>
                  </span>
                </div>
                <div className="flex my-2 h-4 md:mb-0 text-xs">
                  <span className="flex">
                    <span className="font-medium text-gray-500 dark:text-white/60">
                      {wallet}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileHeader;
