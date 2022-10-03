/* This example requires Tailwind CSS v2.0+ */
import { useModalProvider } from '@/contexts/ModalContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  value?: string | number;
  includePc?: boolean;
  suffix?: string;
}

export default function HolderComparisonDetailsStandardDataRow(props: Props) {
  return (
    <div className="w-fit">
      <span className="font-bold">{`${props.value}${
        props.includePc ? '%' : ''
      }`}</span>
      {` ${props.suffix}`}
    </div>
  );
}
