/* This example requires Tailwind CSS v2.0+ */
import { useModalProvider } from '@/contexts/ModalContext';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import HolderComparisonDetailsStandardDataRow from './HolderComparisonDetailsStandardDataRow';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<string | undefined>>;
}

export default function HolderComparisonDetailsModal(props: Props) {
  const { modalData } = useModalProvider();

  function handleClick(e: any) {
    e.stopPropagation();
  }

  return (
    <Transition show={!!modalData} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          props.setOpen(undefined);
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
              props.setOpen(undefined);
            }}
          />
        </Transition.Child>

        <div
          onClick={() => {
            props.setOpen(undefined);
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
              <div className="relative w-full max-w-5xl transform px-4 transition-all opacity-100 scale-100">
                <div
                  className="overflow-hidden w-full h-[80vh] rounded-lg shadow-md"
                  onClick={(e) => handleClick(e)}
                >
                  <div className="relative flex w-full h-40 p-4 gap-x-2 dark:bg-black/60">
                    <div
                      className="flex h-full w-full bg-cover rounded-lg"
                      style={{
                        backgroundImage: `url('${modalData?.holderComparisonData?.sourceCollection?.bannerImageUrl}')`,
                      }}
                    ></div>
                    <div
                      className="flex h-full w-full bg-cover rounded-lg"
                      style={{
                        backgroundImage: `url('${modalData?.holderComparisonData?.targetCollection?.bannerImageUrl}')`,
                      }}
                    ></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pt-4 px-5 inline-flex text-xl">
                      <div className="bg-black/90 rounded-md inline-flex px-2 py-1 -mt-8 gap-x-8 items-center">
                        <img
                          className="h-[60px] w-[60px] flex-grow block rounded-full self-center"
                          src={
                            modalData?.holderComparisonData?.sourceCollection
                              ?.imageUrl
                          }
                        />
                        {'x'}
                        <img
                          className="h-[60px] w-[60px] flex-grow block rounded-full self-center"
                          src={
                            modalData?.holderComparisonData?.targetCollection
                              ?.imageUrl
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full">
                    <div className="text-left gap-y-4 flex flex-col text-xs bg-black/90 h-full p-4">
                      <div className="text-2xl font-medium">
                        Holder Analysis
                      </div>

                      <div className="font-bold">Holders</div>
                      <div className="flex flex-col gap-y-2 p-3 bg-white/10 rounded-md w-full">
                        <div className="flex gap-x-1 w-max">
                          <span className="font-bold">
                            {
                              modalData?.holderComparisonData?.filteredHolders
                                ?.length
                            }
                          </span>
                          {' unique wallets holding both NFTs'}
                        </div>
                        <div className="bg-white/10 hover:bg-white/[.15] rounded-md px-2 py-1 w-max grid gap-x-1 gap-y-2">
                          <HolderComparisonDetailsStandardDataRow
                            value={modalData?.holderComparisonData?.sourceHolderPc?.toPrecision(
                              2,
                            )}
                            includePc={true}
                            suffix={` of all ${modalData?.holderComparisonData?.sourceName} holders.`}
                          />
                          <HolderComparisonDetailsStandardDataRow
                            value={modalData?.holderComparisonData?.targetHolderPc?.toPrecision(
                              2,
                            )}
                            includePc={true}
                            suffix={` of all ${modalData?.holderComparisonData?.targetName} holders.`}
                          />
                        </div>
                      </div>

                      <div className="font-bold">{`${modalData?.holderComparisonData?.sourceName} NFTs`}</div>
                      <div className="flex flex-col gap-y-2 p-3 bg-white/10 rounded-md">
                        <HolderComparisonDetailsStandardDataRow
                          value={modalData?.holderComparisonData?.sourceNfts}
                          suffix={` ${modalData?.holderComparisonData?.sourceName} NFTs`}
                        />
                        <div className="bg-white/10 hover:bg-white/[.15] rounded-md px-2 py-1 w-max grid gap-x-1 gap-y-2">
                          <HolderComparisonDetailsStandardDataRow
                            value={modalData?.holderComparisonData?.sourceNftsPc.toPrecision(
                              3,
                            )}
                            includePc={true}
                            suffix={' of the collection.'}
                          />
                        </div>
                      </div>

                      <div className="font-bold">{`${modalData?.holderComparisonData?.targetName} NFTs`}</div>
                      <div className="flex flex-col gap-y-2 p-3 bg-white/10 rounded-md">
                        <HolderComparisonDetailsStandardDataRow
                          value={modalData?.holderComparisonData?.targetNfts}
                          suffix={` ${modalData?.holderComparisonData?.targetName} NFTs`}
                        />
                        <div className="bg-white/10 hover:bg-white/[.15] rounded-md px-2 py-1 w-max grid gap-x-1 gap-y-2">
                          <HolderComparisonDetailsStandardDataRow
                            value={modalData?.holderComparisonData?.targetNftsPc.toPrecision(
                              3,
                            )}
                            includePc={true}
                            suffix={' of the collection.'}
                          />
                        </div>
                      </div>
                      <div className="font-bold">Overall:</div>
                      <div className="bg-white/10 hover:bg-white/[.15] rounded-md px-2 py-1 w-full grid gap-x-1 gap-y-2">
                        <div>{modalData?.holderComparisonData?.score}</div>
                      </div>
                      {/* Very Low, Low, Medium, High Very High*/}
                    </div>
                    <div className="w-full h-full bg-black/90 border-l border-white/5 p-4 flex-col flex gap-y-4">
                      <div className="text-2xl font-medium w-full text-left">
                        Wallets Table
                      </div>
                      <div className="flex w-full items-end border-b border-white/5 pb-4 overflow-auto">
                        <div className="flex w-[65%]">Wallets</div>
                        <div className="justify-center flex w-[15%]">
                          <img
                            className="h-8 w-8 block rounded-full self-center"
                            src={
                              modalData?.holderComparisonData?.sourceCollection
                                ?.imageUrl
                            }
                          />
                        </div>
                        <div className="justify-center flex w-[15%]">
                          <img
                            className="h-8 w-8 block rounded-full self-center"
                            src={
                              modalData?.holderComparisonData?.targetCollection
                                ?.imageUrl
                            }
                          />
                        </div>
                      </div>

                      {/* ALLOW FOR SORTING + STOP THE BOTTOM BEING CUT OFF */}

                      <div className="w-full h-full bg-black/90 border-white/5 flex-col overflow-auto flex flex-1">
                        {modalData?.holderComparisonData?.filteredHolders?.map(
                          (data: any) => (
                            <div
                              key={`${data.ownerAddress}-${modalData?.holderComparisonData?.targetCollection?.contract}-${modalData?.holderComparisonData?.sourceCollection?.contractAddress}`}
                              className="flex w-full text-sm hover:bg-white/5 py-2 transition-all cursor-pointer"
                            >
                              <div className="flex gap-x-2 w-[65%]">
                                <Jazzicon
                                  diameter={20}
                                  seed={jsNumberForAddress(data.ownerAddress)}
                                />
                                {data.ownerAddress}
                              </div>
                              <div className="justify-center flex w-[15%]">
                                {data.tokenBalance}
                              </div>
                              <div className="justify-center flex w-[15%]">
                                {data.targetCollectionBalance}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
