import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const PlusIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 21.5C12.1598 21.5 13.1 20.5598 13.1 19.4V13.1H19.4C20.5598 13.1 21.5 12.1598 21.5 11C21.5 9.8402 20.5598 8.9 19.4 8.9H13.1V2.6C13.1 1.4402 12.1598 0.5 11 0.5C9.8402 0.5 8.9 1.4402 8.9 2.6V8.9H2.6C1.4402 8.9 0.5 9.8402 0.5 11C0.5 12.1598 1.4402 13.1 2.6 13.1H8.9V19.4C8.9 20.5598 9.8402 21.5 11 21.5Z"
        fill="#ffffff"
      />
    </svg>
  );
};

export default PlusIcon;
