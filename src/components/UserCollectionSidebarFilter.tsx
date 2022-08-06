interface Props {
  userNfts?: any;
  collectionNames?: { [key: string]: string };
  getCollectionNfts: any;
  activeCollection: string;
}

export default function UserCollectionSidebarFilter(props: Props) {
  return (
    <>
      <div className="bg-white dark:bg-white/5 flex-col h-inherit overflow-scroll w-[20vw] px-3 pt-5 float-right drop-shadow z-0 text-sm pb-60">
        <div className="flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer">
          <div className="font-semibold">Collections</div>
          <div>{props.userNfts?.totalCount}</div>
        </div>
        {props?.userNfts?.summary?.map((nft: any) => (
          <div key={nft.contract}>
            {props.collectionNames && props.collectionNames[nft.contract] && (
              <div
                className={
                  'flex justify-between p-2 mt-1 rounded-md cursor-pointer' +
                  (props.activeCollection == nft.contract
                    ? ' bg-blue-50 dark:bg-blue-300/[.1]'
                    : ' hover:bg-gray-50 dark:hover:bg-white/[.03]')
                }
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
