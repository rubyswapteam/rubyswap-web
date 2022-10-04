import moment from 'moment';
import { useEffect, useState } from 'react';
import OwnedNftCollectionTableBody from './OwnedNftCollectionTableBody';
import { useWalletProvider } from '../contexts/WalletProviderContext';
import { useWeb3Provider } from '@/contexts/Web3ProviderContext';

export default function OwnedNftCollectionTable() {
  const [fullOwnedCollections, setFullOwnedCollections] = useState<
    undefined | any[]
  >(undefined);
  const [ownedCollections, setOwnedollections] = useState<undefined | any[]>(
    undefined,
  );
  const [lastFetch, setLastFetch] = useState<number>(0);
  const { userCollections, fetchUserCollections } = useWalletProvider();
  const { activeWallet } = useWeb3Provider();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const lastFetchSS = Number(sessionStorage.getItem('r-onct-lf'));
    const refreshTime = moment().unix() - 600;
    if ((lastFetchSS && lastFetchSS < refreshTime) || lastFetch < refreshTime) {
      try {
        fetchDbData();
      } catch (error) {
        console.log(error);
      }
    } else {
      const collectionString = sessionStorage.getItem('r-onct-ftc');
      const collections = collectionString
        ? JSON.parse(collectionString)
        : null;
      if (collections) {
        const time = Number(sessionStorage.getItem('r-onct-lf') as string);
        applyUpdate(collections, time, false);
      } else {
        sessionStorage.removeItem('r-onct-lf');
        sessionStorage.removeItem('r-onct-ftc');
        fetchDbData();
      }
    }
  };

  function fetchDbData() {
    if (activeWallet) {
      fetchUserCollections(activeWallet).then((res: any) => {
        const time = moment().unix();
        applyUpdate(res, time);
      });
    }
  }

  function applyUpdate(collections: any, time: number, persist = true) {
    // setFullOwnedCollections(collections);
    // setOwnedollections(
    //   collections.filter((collection: any) => collection.period === 'one_day'),
    // );
    setLastFetch(time);
    if (persist) {
      sessionStorage.setItem('r-onct-ftc', JSON.stringify(collections));
      sessionStorage.setItem('r-onct-lf', time.toString());
    }
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="md:rounded-lg">
            {userCollections && (
              <div className="mt-1 flex flex-col">
                <div className="">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className=" md:rounded-lg">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr className="flex">
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 dark:text-white sm:pl-6 w-[5%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 text-left text-sm text-gray-900 dark:text-white w-[5%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              &nbsp;
                            </th>
                            <th
                              scope="col"
                              className="font-semibold py-3.5 pr-3 text-left text-sm text-gray-900 dark:text-white w-[20%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Collection
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Socials
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Volume
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Average Price
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Sales
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Items Owned
                            </th>
                            <th
                              scope="col"
                              className="font-semibold px-3 py-3.5 text-left text-sm text-gray-900 dark:text-white w-[10%] top-0 sticky border-b border-gray-100 dark:border-white/20"
                            >
                              Unique Holders
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className="divide-y divide-gray-100 dark:divide-gray-800"
                          id="scrollableTarget"
                        >
                          {userCollections && userCollections.length > 0 && (
                            <OwnedNftCollectionTableBody
                              userCollections={userCollections}
                            />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
