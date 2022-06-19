import { useNftProvider } from '@/contexts/NftProviderContext';
import React, { useEffect } from 'react';

export default function WatchlistNftCollectionTable() {
  const { nftCollections, fetchAllTrendingNftCollections } = useNftProvider();

  useEffect(() => {
    if (!nftCollections) {
      fetchAllTrendingNftCollections();
    }
  }, [nftCollections]);

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-3 lg:px-4">
            <div className="overflow-hidden md:rounded-lg">
              <div className="text-center mt-1">
                N/A
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
