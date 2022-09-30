/* This example requires Tailwind CSS v2.0+ */
import { trimHex } from '@/utils/nftUtils';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import EthereumIcon from './EthereumIcon';
import VerifiedBadgeIcon from './VerifiedBadgeIcon';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<any>;
}

export default function SearchModal(props: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([]);

  function reset() {
    setSearchResults([]);
    setSearchTerm('');
  }

  function handleClick(e: any) {
    e.stopPropagation();
  }

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async (q: string) => {
      if (isSubscribed) {
        const API_URL = `/.netlify/functions/searchNfts?searchTerm=${q}`;
        const response = await fetch(API_URL, {
          method: 'GET',
          redirect: 'follow',
        });
        const responseJson = await response.json();
        setSearchResults(responseJson);
      }
    };

    setIsLoading(true);

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchData(searchTerm).catch(console.error);
        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      isSubscribed = false;
    };
  }, [searchTerm]);
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          props.setOpen(false);
          reset();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"
            onClick={() => {
              props.setOpen(false);
              reset();
            }}
          />
        </Transition.Child>

        <div
          onClick={() => {
            props.setOpen(false);
            reset();
          }}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
                <div
                  className="overflow-hidden rounded-lg bg-white dark:bg-white/40 shadow-md"
                  id="headlessui-dialog-panel-26"
                  onClick={(e) => handleClick(e)}
                >
                  <div className="relative">
                    <input
                      className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="Search collections..."
                      aria-label="Search components"
                      id="headlessui-combobox-input-27"
                      role="combobox"
                      type="text"
                      aria-expanded="false"
                      autoComplete="off"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      className="pointer-events-none absolute top-4 right-4 h-6 w-6 fill-slate-400"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                    </svg>
                  </div>
                </div>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-500"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div
                    className="h-64 bg-white dark:bg-white/40  rounded-lg w-full mt-5 shadow-md overflow-scroll"
                    onClick={(e) => handleClick(e)}
                  >
                    {searchResults.map((res: any) => (
                      <div
                        className="hover:bg-gray-50 dark:hover:bg-white/50 transition-colors"
                        key={'searchModalItem-' + res?.contractAddress}
                      >
                        {res && (
                          <Link
                            href={`/collection/${res.slug}`}
                            prefetch={false}
                          >
                            <div className="px-4 py-2 flex">
                              {res?.imageUrl && (
                                <div className="h-10 w-10 relative contents rounded-full self-center">
                                  <img
                                    className="h-[40px] w-[40px] flex-grow block rounded-full self-center"
                                    src={res?.imageUrl}
                                  />
                                </div>
                              )}
                              {!res?.imageUrl && (
                                <div className="h-10 w-10 rounded-full self-center">
                                  <Jazzicon
                                    diameter={39}
                                    seed={jsNumberForAddress(
                                      res.contractAddress,
                                    )}
                                  />
                                </div>
                              )}
                              <div className="text-left text-sm ml-3 text-black">
                                <div className="w-max flex items-center">
                                  <div className="pt-1">{res?.name}</div>
                                  {['true', 'verified'].includes(
                                    res?.osVerificationState,
                                  ) && (
                                    <div className="flex-shrink-0 flex w-max items-center justify-center bg-blue rounded-full">
                                      <VerifiedBadgeIcon
                                        height={16}
                                        width={16}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="text-black/75">
                                  {res?.contractAddress &&
                                    trimHex(res?.contractAddress, 5)}
                                </div>
                              </div>

                              <div className="text-right align-right text-sm ml-3 text-black w-full">
                                <div className="flex items-center justify-end">
                                  <div className="pt-1">
                                    {'Floor: ' + res?.osFloorPrice}
                                  </div>
                                  <EthereumIcon height={15} width={15} />
                                </div>
                                <div className="text-black/75">
                                  {'Supply: ' + res?.totalSupply}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </Transition.Child>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
