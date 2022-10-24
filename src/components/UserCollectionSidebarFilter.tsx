import { IUserNftSummary } from '../utils/nftUtils';

interface Props {
  userNfts?: any;
  collectionNames?: { [key: string]: string };
  getCollectionNfts: any;
  activeCollection: string;
}

export default function UserCollectionSidebarFilter(props: Props) {
  return (
    <>
      {props?.userNfts?.summary && (
        <div className="flex-col h-inherit overflow-scroll w-[20vw] px-3 pt-5 float-right drop-shadow z-0 text-sm pb-60">
          <div className="bg-white border dark:border-white/5 dark:bg-white/5 p-2 rounded-md">
            <div className="flex justify-between p-2 mt-2 rounded-md">
              <div className="font-semibold">Collections</div>
              <div>{props.userNfts?.totalCount}</div>
            </div>
            {props?.userNfts?.summary?.map((collection: IUserNftSummary) => (
              <div key={`ucsf-${collection.contractAddress}`}>
                {collection && collection.balance && (
                  <div
                    className={
                      'flex justify-between p-2 mt-1 rounded-md cursor-pointer' +
                      (props.activeCollection == collection.contractAddress
                        ? ' bg-blue-50 dark:bg-blue-300/[.1]'
                        : ' hover:bg-gray-50 dark:hover:bg-white/[.03]')
                    }
                    onClick={() =>
                      props.getCollectionNfts(collection.contractAddress)
                    }
                  >
                    <div className="">{collection?.name}</div>
                    <div>{collection.balance}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
