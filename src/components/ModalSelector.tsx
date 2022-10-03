/* This example requires Tailwind CSS v2.0+ */
import { useModalProvider } from '../contexts/ModalContext';
import HolderComparisonDetailsModal from './HolderComparisonDetailsModal';
import SearchModal from './SearchModal';

export default function ModalSelector() {
  const { modal, setModal } = useModalProvider();
  return (
    <>
      {modal === 'search' && (
        <SearchModal open={modal === 'search'} setOpen={setModal} />
      )}
      {modal === 'holder-comparison-details' && (
        <HolderComparisonDetailsModal
          open={modal === 'holder-comparison-details'}
          setOpen={setModal}
        />
      )}
    </>
  );
}
