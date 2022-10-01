import React, {
  JSXElementConstructor,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';

const ModalProviderContext = React.createContext<any>({});

export const ModalProvider = ({
  children,
}: {
  children: ReactElement<string | JSXElementConstructor<unknown>>;
}) => {
  const [loadingData, setLoadingData] = useState<any>(undefined);

  const contextValue = useMemo(
    () => ({
      loadingData,
      setLoadingData,
    }),
    [loadingData, setLoadingData],
  );

  return (
    <ModalProviderContext.Provider value={contextValue}>
      {children}
    </ModalProviderContext.Provider>
  );
};

export const useModalProvider = () => useContext(ModalProviderContext);
