import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const EthereumIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.56641 4.55935L2.76099 0L0 4.56239L2.78244 6.22185L5.56641 4.55935Z" fill="#777E91"/>
      <path d="M5.56641 5.11627L2.77631 6.74082L0 5.11627L2.78244 8.99999L5.56641 5.11627Z" fill="#777E91"/>
    </svg>
  );
}

export default EthereumIcon;
