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
  const [loadingRoute, setLoadingRoute] = useState<any>(undefined);
  const [modalData, setModalData] = useState<any>(undefined);
  const [modal, setModal] = useState<string>();

  const contextValue = useMemo(
    () => ({
      loadingData,
      setLoadingData,
      loadingRoute,
      setLoadingRoute,
      modal,
      setModal,
      modalData,
      setModalData,
    }),
    [
      loadingData,
      setLoadingData,
      loadingRoute,
      setLoadingRoute,
      modal,
      setModal,
      modalData,
      setModalData,
    ],
  );

  return (
    <ModalProviderContext.Provider value={contextValue}>
      {children}
    </ModalProviderContext.Provider>
  );
};

export const useModalProvider = () => useContext(ModalProviderContext);
