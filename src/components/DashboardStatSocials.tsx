import Link from 'next/link';
import React from 'react';
import SocialsWrapper from './SocialsWrapper';
import DiscordLogo from './DiscordLogo';
import TwitterLogo from './TwitterLogo';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
  name: string;
  value: string;
  discord: string;
  twitter: string;
}

export const DashboardStatSocials: React.FC<Props> = ({
  id,
  name,
  value,
  discord,
  twitter,
}): JSX.Element => {
  const [discordCount, setDiscordCount] = useState<any>('N/A');
  const [twitterCount, setTwitterCount] = useState<any>('N/A');

  const fetchGet = async (url: string, func: any) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      });
      const resJson = await res.json();
      func(resJson);
    } catch (error) {
      func('Unable to load.');
    }
  };

  useEffect(() => {
    if (discord) {
      fetchGet(
        `https://discord.com/api/invites/${discord
          .split('/')
          .pop()}?with_counts=true`,
        setDiscordCount,
      );
    }
    // if (twitter) {
    //   fetchGet(
    //     `https://discord.com/api/invites/${discord
    //       .split('/')
    //       .pop()}?with_counts=true`,
    //     setDiscordCount,
    //   );
    // }
  }, []);

  return (
    <div
      key={id + '-' + name}
      className="grid grid-cols-1 gap-2 sm:grid-rows-2 flex-col h-full"
    >
      <div className="flex gap-x-3 transition-colors text-sm text-left px-4 py-2 bg-white dark:bg-white/[.07] dark:hover:bg-white/[.12] drop-shadow-md rounded-lg overflow-hidden hover:bg-gray-50 cursor-pointer  self-center items-center">
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <SocialsWrapper link={discord} show={true}>
            <DiscordLogo />
          </SocialsWrapper>
        </dt>
        <dd className="font-semibold flex text-xs text-gray-600 dark:text-gray-200 bg-white/10 rounded-lg px-1.5 pt-0.5 ">
          {discordCount?.approximate_member_count
            ? `${discordCount?.approximate_member_count} members`
            : 'Unavailable'}
        </dd>
      </div>
      <div className="flex gap-x-3 transition-colors text-sm text-left px-4 py-2 bg-white dark:bg-white/[.07] dark:hover:bg-white/[.12] drop-shadow-md rounded-lg overflow-hidden hover:bg-gray-50 cursor-pointer  self-center items-center">
        <dt className="font-medium truncate text-transparent bg-clip-text bg-cover text-gray-600 dark:text-white/80">
          <SocialsWrapper link={twitter} show={true}>
            <TwitterLogo />
          </SocialsWrapper>
        </dt>
        <dd className="'pt-1 font-semibold flex text-xs text-gray-600 dark:text-gray-200 bg-white/10 rounded-lg px-1.5 py-1'">
          {twitterCount?.approximate_member_count
            ? `${twitterCount?.approximate_member_count} members`
            : 'Unavailable'}
        </dd>
      </div>
    </div>
  );
};
