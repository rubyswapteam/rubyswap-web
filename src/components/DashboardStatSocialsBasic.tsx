import Link from 'next/link';
import React from 'react';
import SocialsWrapper from './SocialsWrapper';
import DiscordLogo from './DiscordLogo';
import TwitterLogo from './TwitterLogo';
import { useEffect, useState } from 'react';
import WebsiteIcon from './WebsiteIcon';
import EtherscanLogo from './EtherscanLogo';

interface Props {
  id: string;
  name: string;
  value: string;
  discord: string;
  twitter: string;
  website: string;
  contract: string;
}

export const DashboardStatSocialsBasic: React.FC<Props> = ({
  id,
  name,
  value,
  discord,
  twitter,
  website,
  contract,
}): JSX.Element => {
  return (
    <div
      key={id + '-' + name}
      className="flex gap-x-5 transition-colors text-sm text-left px-4 py-2 bg-white dark:bg-white/[.07] dark:hover:bg-white/[.12] drop-shadow-md rounded-lg overflow-hidden hover:bg-gray-50 cursor-pointer  self-center items-center justify-center h-full"
    >
      {website && (
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <a
            target="_blank"
            href={website}
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="self-center"
          >
            <WebsiteIcon width="22.5" height="18" />
          </a>
        </dt>
      )}
      {contract && (
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <a
            target="_blank"
            href={`https://etherscan.io/address/${contract}`}
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="self-center"
          >
            <EtherscanLogo class="h-5 w-5" />
          </a>
        </dt>
      )}
      {discord && (
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <a
            target="_blank"
            href={discord}
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="self-center"
          >
            <DiscordLogo width="21" height="18" />
          </a>
        </dt>
      )}
      {twitter && (
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <a
            target="_blank"
            href={`https://twitter.com/${twitter}`}
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="self-center"
          >
            <TwitterLogo width="22.5" height="18" />
          </a>
        </dt>
      )}
    </div>
  );
};
