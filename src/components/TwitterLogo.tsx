import React from 'react';

export default function TwitterLogo(props: any) {
  return (
    <svg
      width={props?.width || '15'}
      height={props?.height || '12'}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="hover:fill-black dark:hover:fill-white"
        d="M14.8392 2.6573L12.7688 4.3855C12.3555 8.38914 8.31058 11.5 3.46911 11.5C2.47221 11.5 1.65066 11.3681 1.0272 11.1078C0.524058 10.8979 0.317948 10.6725 0.266806 10.6084C0.220924 10.5509 0.191183 10.4856 0.179804 10.4172C0.168425 10.3488 0.175702 10.2792 0.201092 10.2135C0.226481 10.1477 0.269327 10.0877 0.326429 10.0377C0.383532 9.98777 0.453415 9.94923 0.530861 9.92499C0.548523 9.91942 2.16771 9.40032 3.21421 8.41197C2.56328 8.02507 1.99038 7.55404 1.51707 7.01661C0.576205 5.95077 -0.418882 4.09979 0.183424 1.33454C0.201351 1.25224 0.245915 1.17561 0.312287 1.11295C0.378659 1.05028 0.464308 1.00397 0.559957 0.979032C0.655605 0.954094 0.757605 0.951479 0.854907 0.97147C0.952209 0.991461 1.0411 1.0333 1.11196 1.09244C1.13615 1.11259 3.42102 2.99289 6.21419 3.60025L6.21456 3.24967C6.22047 2.51583 6.57522 1.81397 7.20083 1.29838C7.82644 0.78278 8.67171 0.495633 9.55085 0.50005C10.122 0.506652 10.6813 0.636791 11.1741 0.877754C11.667 1.11872 12.0765 1.46227 12.3628 1.87484L14.4509 1.87487C14.5595 1.87487 14.6657 1.90175 14.756 1.95211C14.8463 2.00248 14.9166 2.07406 14.9582 2.15781C14.9998 2.24155 15.0106 2.33371 14.9895 2.42262C14.9683 2.51153 14.916 2.5932 14.8392 2.6573Z"
        fill="currentColor"
      />
    </svg>
  );
}
