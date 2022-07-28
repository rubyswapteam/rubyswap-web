import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const DbProviderContext = React.createContext<any>({});

export const DbProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [userNftCollections, setUserNftCollections] = useState<any[]>();

  const fetchCollectionNames = useCallback(async (contractAddress: string) => {
    const x = contractAddress;
  }, []);

  const contextValue = useMemo(
    () => ({
      fetchCollectionNames,
      userNftCollections,
      setUserNftCollections,
    }),
    [fetchCollectionNames, userNftCollections, setUserNftCollections],
  );

  return (
    <DbProviderContext.Provider value={contextValue}>
      {children}
    </DbProviderContext.Provider>
  );
};

export const useDbProvider = () => useContext(DbProviderContext);
