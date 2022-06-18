import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const EthereumIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width ? width : 24}
      height={width ? height : 24}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.66774 8.09767L7.94088 2.66673L7.94091 2.66662L7.94093 2.66665L7.94095 2.66662V2.66668L11.2141 8.09766L11.2141 8.09768L7.94095 10.0324V10.0325L7.94091 10.0324L7.94088 10.0324L7.79082 9.94373L4.66772 8.09767L4.66774 8.09767ZM7.94071 13.3305L4.66774 8.71836L7.94092 10.6522L11.216 8.71838L7.94095 13.3307V13.3309L7.9409 13.3308L7.94083 13.3309L7.94071 13.3305Z"
        fill="#818FA3"
      />
    </svg>
  );
}

export default EthereumIcon;
