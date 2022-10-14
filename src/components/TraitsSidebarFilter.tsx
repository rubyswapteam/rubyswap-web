import { useEffect, useState } from 'react';

interface Props {
  traits: any;
  setActiveTrait: (trait: any[]) => void;
  camelize: (str: string) => string;
}

export default function TraitsSidebarFilter(props: Props) {
  const [traitTable, setTraitTable] = useState<
    { key: string; count: number }[] | undefined
  >(undefined);
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
      <div className="flex-col h-inherit overflow-scroll w-[20vw] pt-5 float-right drop-shadow z-0 text-sm pb-60">
        <div className="bg-white border dark:border-white/5 dark:bg-white/5 p-2 rounded-md">
          <div className="flex justify-between p-2 mt-2 rounded-md">
            <div className="font-semibold">Traits</div>
            <div>{traitTable?.length}</div>
          </div>
          {traitTable &&
            traitTable.map((trait: any, i: number) => (
              <div key={i}>
                <div
                  onClick={() =>
                    props.setActiveTrait(
                      props.traits[
                        Object.keys(props.traits)[
                          Object.keys(props.traits).findIndex(
                            (x) => x.toLowerCase() === trait.key.toLowerCase(),
                          )
                        ]
                      ],
                    )
                  }
                  className={
                    'flex justify-between transition-colors p-2 mt-1 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5'
                  }
                >
                  <div className="">{props.camelize(trait.key)}</div>
                  <div className="">{trait.count}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
