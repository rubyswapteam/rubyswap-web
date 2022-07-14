interface Props {
  userNfts?: any;
  collectionNames?: any;
  getCollectionNfts: any;
}

export default function UserCollectionSidebarFilter(props: Props) {
  // useEffect(() => {
  //   fetchAllTrendingNftCollections();
  // }, [trendingNftCollections]);
  return (
    <>
      <div className="bg-white flex-col h-full w-[20vw] px-3 py-5 float-right drop-shadow z-0 text-sm">
        <div className="flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer">
          <div className="font-semibold">Collections</div>
          <div>{props.userNfts?.totalCount}</div>
        </div>
        {props.userNfts?.summary?.map((nft: any) => (
          <div key={nft.contract}>
            {props.collectionNames && props.collectionNames[nft.contract] && (
              <div
                className="flex justify-between p-2 mt-1 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => props.getCollectionNfts(nft.contract)}
              >
                <div className="">{props.collectionNames[nft.contract]}</div>
                <div>{nft.count}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
