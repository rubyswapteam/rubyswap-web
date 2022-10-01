/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, SetStateAction } from 'react';
import SearchModal from './SearchModal';
import LoadingModal from './LoadingModal';

interface Props {
  modal: string | undefined;
  setModal: Dispatch<SetStateAction<string | undefined>>;
}

export default function ModalSelector(props: Props) {
  return (
    <>
      {props.modal === 'search' && (
        <SearchModal open={props.modal === 'search'} setOpen={props.setModal} />
      )}
      {/* {props.modal === undefined && (
        <LoadingModal
          open={props.modal === undefined}
          setOpen={props.setModal}
        />
      )} */}
    </>
  );
}
