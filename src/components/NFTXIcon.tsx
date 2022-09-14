import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

export const NFTXIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1400 1400"
    >
      <defs>
        <style>
          {
            '.cls-1{fill:url(#linear-gradient);}.cls-2{fill:#fff;}.cls-3{opacity:0.5;fill:url(#linear-gradient-2);}'
          }
        </style>
        <linearGradient
          id="linear-gradient"
          x1="958.46"
          y1="277.79"
          x2="460.73"
          y2="775.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.09" stopColor="#ff6d41" />
          <stop offset="0.5" stopColor="#fa297f" />
          <stop offset="1" stopColor="#fa297f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="820.59"
          y1="147.54"
          x2="320.81"
          y2="647.31"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#652cb4" />
          <stop offset="0.07" stopColor="#652cb4" stopOpacity="0.82" />
          <stop offset="0.19" stopColor="#652cb4" stopOpacity="0.53" />
          <stop offset="0.3" stopColor="#652cb4" stopOpacity="0.3" />
          <stop offset="0.4" stopColor="#652cb4" stopOpacity="0.14" />
          <stop offset="0.49" stopColor="#652cb4" stopOpacity="0.04" />
          <stop offset="0.55" stopColor="#652cb4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <title>Artboard 1</title>
      <polygon
        className="cls-1"
        points="700 0 163.75 536.25 700 1050.04 1236.25 536.25 700 0"
      />
      <path
        className="cls-2"
        d="M430.13,992.57c11.81-15.81,23-30.82,36.4-45.41C305.36,986,194.37,1067.34,194.37,1161.48c0,3.51.19,7,.49,10.46,15.81-6,32.49-13.18,50.21-21.89C351.53,1097.75,393.29,1041.87,430.13,992.57Z"
      />
      <path
        className="cls-2"
        d="M598,1165.6c32.23-43.13,60.06-80.37,138.73-119s125.17-37.91,179-37.08c36.06.57,74.95,1.16,122.39-9-57.85-31.08-132.23-54.59-216.3-67.2L700,1050l-85.15-81.58c-60.68,40.86-91.77,82.41-120,120.12-32.23,43.13-60.06,80.38-138.73,119-55.18,27.1-94.52,34.83-131.68,36.74,29.31,38.87,78.66,73,141.86,99.24,14.72-5.71,30.2-12.47,46.55-20.5C519.37,1270.78,561.13,1214.9,598,1165.6Z"
      />
      <path
        className="cls-2"
        d="M1085.56,1053.89c-61.54-1-131.28-2.07-237.75,50.24s-148.23,108.18-185.07,157.49c-32.23,43.12-60.06,80.37-138.74,119-3.56,1.75-7,3.4-10.48,5A945.94,945.94,0,0,0,679.8,1400q18.44,0,36.51-.67c19.69-20.84,35-41.28,49.5-60.69,32.22-43.13,60.06-80.38,138.73-119s125.18-37.9,179-37.07c24.78.39,50.9.79,80.21-2.27a120.24,120.24,0,0,0,1.49-18.79c0-38.63-18.71-75.1-51.88-107.37C1104.18,1054.18,1095,1054,1085.56,1053.89Z"
      />
      <path
        className="cls-2"
        d="M874.43,1380c127.17-27.38,225.86-80.77,268.22-146.47-36.37,6.64-77.75,19.39-127,43.6C947,1310.88,905.3,1346.07,874.43,1380Z"
      />
      <polygon
        className="cls-3"
        points="700 536.25 163.75 536.25 700 0 700 536.25"
      />
    </svg>
  );
};
