import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const X2Y2Icon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
        fill="#3B82F6"
      />
      <path
        d="M15.558 5.74403C14.4854 4.69594 13.0181 4.05 11.4 4.05C8.11391 4.05 5.45 6.71391 5.45 10C5.45 13.2861 8.11391 15.95 11.4 15.95C13.0181 15.95 14.4854 15.3041 15.558 14.256C14.2786 15.9243 12.2649 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C12.2649 3 14.2786 4.07568 15.558 5.74403Z"
        fill="white"
      />
      <path
        d="M6.95358 13.4048C7.81167 14.2433 8.98549 14.76 10.28 14.76C12.9089 14.76 15.04 12.6289 15.04 10C15.04 7.37112 12.9089 5.24 10.28 5.24C8.98549 5.24 7.81167 5.75675 6.95358 6.59522C7.97713 5.26054 9.58807 4.4 11.4 4.4C14.4928 4.4 17 6.9072 17 10C17 13.0928 14.4928 15.6 11.4 15.6C9.58807 15.6 7.97713 14.7395 6.95358 13.4048Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2 10C14.2 12.3196 12.3196 14.2 10 14.2C7.6804 14.2 5.8 12.3196 5.8 10C5.8 7.6804 7.6804 5.8 10 5.8C12.3196 5.8 14.2 7.6804 14.2 10ZM12.8 10C12.8 11.5464 11.5464 12.8 10 12.8C8.4536 12.8 7.2 11.5464 7.2 10C7.2 8.4536 8.4536 7.2 10 7.2C11.5464 7.2 12.8 8.4536 12.8 10Z"
        fill="white"
      />
    </svg>
  );
};

export default X2Y2Icon;
