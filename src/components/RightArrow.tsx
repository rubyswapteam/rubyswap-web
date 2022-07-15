import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const RightArrow: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 8.00063C1 7.86802 1.05268 7.74085 1.14645 7.64708C1.24021 7.55331 1.36739 7.50063 1.5 7.50063H13.293L10.146 4.35463C10.0521 4.26075 9.99937 4.13341 9.99937 4.00063C9.99937 3.86786 10.0521 3.74052 10.146 3.64663C10.2399 3.55274 10.3672 3.5 10.5 3.5C10.6328 3.5 10.7601 3.55274 10.854 3.64663L14.854 7.64663C14.9006 7.69308 14.9375 7.74825 14.9627 7.809C14.9879 7.86974 15.0009 7.93486 15.0009 8.00063C15.0009 8.0664 14.9879 8.13152 14.9627 8.19226C14.9375 8.25301 14.9006 8.30819 14.854 8.35463L10.854 12.3546C10.7601 12.4485 10.6328 12.5013 10.5 12.5013C10.3672 12.5013 10.2399 12.4485 10.146 12.3546C10.0521 12.2607 9.99937 12.1334 9.99937 12.0006C9.99937 11.8679 10.0521 11.7405 10.146 11.6466L13.293 8.50063H1.5C1.36739 8.50063 1.24021 8.44795 1.14645 8.35419C1.05268 8.26042 1 8.13324 1 8.00063V8.00063Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default RightArrow;