import { trimHex } from '@/utils/nftUtils';
import { Transition } from '@headlessui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import EthereumIcon from './EthereumIcon';
import EtherscanLogo from './EtherscanLogo';
import SocialsWrapper from './SocialsWrapper';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Link from 'next/link';

export default function UserActivityTable(props: any) {
  const [isShowing, setIsShowing] = useState(true);
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    setTrades(processTrades());
  }, [props.trades]);

  function processTrades() {
    if (!props.trades || !props?.trades?.purchases || !props?.trades?.sales)
      return [];
    const arr: any[] = [];
    Array.prototype.push.apply(arr, props?.trades?.purchases);
    Array.prototype.push.apply(arr, props?.trades?.sales);
    arr.sort(function (a: any, b: any) {
      return b?.timestamp - a?.timestamp;
    });
    console.table({ sorted: arr });
    return arr;
  }

  return (
    <>
      <Transition
        show={isShowing}
        as="div"
        enter="transition ease-out duration-1000"
        enterFrom="transform opacity-0 scale-95 -translate-y-6"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 -translate-y-6"
        className="h-inherit"
      >
        {/* <InfiniteScroll
          dataLength={renderedData.length}
          next={fetchMoreData}
          // hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={window.document.body.clientHeight}
          scrollThreshold={0.5}
          scrollableTarget="scrollableTarget"
          className="w-full"
        > */}
        <>
          <div className="overflow-scroll h-inherit pb-80">
            {props.trades &&
              trades?.map((trade: any, i: number) => (
                <div
                  key={trade?.txn + '-i' + 'user-txn'}
                  className="flex w-full px-2 xl:px-5 py-1"
                >
                  <div className="bg-white/5 border border-white/20 hover:bg-white/10 cursor-pointer w-full rounded-md px-2 xl:px-8 py-2 flex gap-x-4 text-xs">
                    {props.user == trade.to ? (
                      <div className="whitespace-nowrap w-[10%] px-3 self-center">
                        <div className="self-center bg-white/5 rounded-md p-2 w-20 text-center">
                          Purchase
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-nowrap w-[10%] px-3 self-center">
                        <div className="self-center bg-white/5 rounded-md p-2 w-20 text-center">
                          Sale
                        </div>
                      </div>
                    )}
                    {trade?.txn && (
                      <SocialsWrapper
                        link={`https://etherscan.io/tx/${trade?.txn}`}
                      >
                        <EtherscanLogo />
                      </SocialsWrapper>
                    )}

                    <div className="w-[10%] px-3 self-center">
                      <p>From</p>
                      <div className="flex gap-x-1">
                        <Jazzicon
                          diameter={12}
                          seed={jsNumberForAddress(trade.to)}
                        />
                        {trimHex(trade.to, 4)}
                      </div>
                    </div>
                    <div className="w-[10%] px-3 self-center">
                      <p>To</p>
                      <div className="flex gap-x-1">
                        <Jazzicon
                          diameter={12}
                          seed={jsNumberForAddress(trade.from)}
                        />
                        {trimHex(trade.from, 4)}
                      </div>
                    </div>
                    <div className="w-[10%] px-3 self-center">
                      <div className="">
                        <p>Price</p>
                        {props.user == trade.to ? (
                          <div className="flex text-red-300 font-medium">
                            {trade.price.toPrecision(2)}
                            <EthereumIcon height={12} width={12} />
                          </div>
                        ) : (
                          <div className="flex text-green-300 font-medium">
                            {trade.price.toPrecision(2)}
                            <EthereumIcon height={12} width={12} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-[10%] px-3 self-center">
                      <div className="self-center">
                        {props.collectionNames[trade.contract] ||
                          trimHex(trade.contract, 4)}
                      </div>
                    </div>
                    <div className="w-[10%] px-3 self-center">
                      <div className="self-center">
                        {trade.tokenId.length > 7
                          ? trimHex(trade.tokenId, 3)
                          : trade.tokenId}
                      </div>
                    </div>
                    <div className="whitespace-nowrap w-[10%] px-3 self-center">
                      <div className="self-center">
                        {moment.unix(trade?.timestamp).fromNow()}
                      </div>
                    </div>
                    <div className="whitespace-nowrap w-[20%] px-3 self-center">
                      <div className="text-gray-700 dark:text-white/90 block items-center text-xs font-medium">
                        <button
                          className="hover:bg-white/5 border-white/50 border bg-purple/30  dark:hover:bg-purple/20 px-1.5 py-1 rounded-lg"
                          onClick={(event) => event.stopPropagation()}
                        >
                          View Asset
                        </button>
                        <div className="inline-block">
                          <Link href={`/collection/${trade.contract}`}>
                            <button
                              className="hover:bg-black/10 bg-black/20 dark:bg-white/20  dark:hover:bg-white/10 px-1.5 py-1 rounded-lg ml-2"
                              onClick={(event) => event.stopPropagation()}
                            >
                              View Collection
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
        {/* </InfiniteScroll> */}
      </Transition>
    </>
  );
}
