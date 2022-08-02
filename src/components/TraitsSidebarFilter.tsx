import { useEffect, useState } from 'react';

interface Props {
  traits: any;
}

export default function TraitsSidebarFilter(props: Props) {
  const [traitTable, setTraitTable] = useState<
    { key: string; count: number }[] | undefined
  >(undefined);
  function camelize(str: string) {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
  }
  useEffect(() => {
    if (props.traits) {
      const keys = Object.keys(props.traits);
      const traitCounts = keys.map((key) => {
        return {
          key: key,
          count: props.traits[key] ? Object.keys(props.traits[key]).length : 0,
        };
      });
      setTraitTable(traitCounts.sort((a, b) => a.key.localeCompare(b.key)));
    }
  }, [props.traits]);

  return (
    <>
      <div className="bg-white flex-col h-inherit overflow-scroll w-[20vw] px-3 pt-5 float-right drop-shadow z-0 text-sm pb-60">
        <div className="flex justify-between p-2 mt-2 rounded-md hover:bg-gray-50 cursor-pointer">
          <div className="font-semibold">Traits</div>
          <div>{traitTable?.length}</div>
        </div>
        {traitTable &&
          traitTable.map((trait: any, i: number) => (
            <div key={i}>
              <div
                className={
                  'flex justify-between p-2 mt-1 rounded-md cursor-pointer' +
                  // (props.activeCollection == nft.contract
                  // ? ' bg-blue-50': ' hover:bg-gray-50')
                  ' hover:bg-gray-50'
                }
                // onClick={() => props.getCollectionNfts(nft.contract)}
              >
                <div className="">{camelize(trait.key)}</div>
                <div className="">{trait.count}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
