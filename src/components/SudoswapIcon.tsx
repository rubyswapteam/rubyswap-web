import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

export const SudoswapIcon: React.FC<Props> = ({
  width,
  height,
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 14.4C0 6.4471 6.4471 0 14.4 0H33.6C41.5529 0 48 6.4471 48 14.4V33.6C48 41.5529 41.5529 48 33.6 48H14.4C6.4471 48 0 41.5529 0 33.6V14.4Z"
        fill="#B9B9FF"
      />
      <path
        d="M9.29999 15H12L15.3 24L12 33H9.29999L12.6 24L9.29999 15Z"
        fill="#121212"
      />
      <path
        d="M23.5727 33.192C22.1807 33.192 21.0367 32.872 20.1407 32.232C19.2607 31.592 18.8207 30.72 18.8207 29.616H21.2447C21.2447 30.112 21.4607 30.496 21.8927 30.768C22.3407 31.024 22.9167 31.152 23.6207 31.152H24.6287C25.4607 31.152 26.0767 30.992 26.4767 30.672C26.8767 30.336 27.0767 29.896 27.0767 29.352C27.0767 28.808 26.8847 28.384 26.5007 28.08C26.1167 27.776 25.5727 27.56 24.8687 27.432L23.0687 27.168C20.4447 26.752 19.1327 25.48 19.1327 23.352C19.1327 22.136 19.5327 21.208 20.3327 20.568C21.1327 19.928 22.2767 19.608 23.7647 19.608H24.6767C26.0527 19.608 27.1567 19.92 27.9887 20.544C28.8207 21.152 29.2367 21.96 29.2367 22.968H26.8127C26.8127 22.568 26.6127 22.248 26.2127 22.008C25.8287 21.768 25.3007 21.648 24.6287 21.648H23.7167C22.9807 21.648 22.4207 21.8 22.0367 22.104C21.6527 22.392 21.4607 22.808 21.4607 23.352C21.4607 24.28 22.1167 24.848 23.4287 25.056L25.2287 25.344C26.6687 25.568 27.7247 25.992 28.3967 26.616C29.0687 27.224 29.4047 28.104 29.4047 29.256C29.4047 30.488 28.9967 31.456 28.1807 32.16C27.3807 32.848 26.1807 33.192 24.5807 33.192H23.5727Z"
        fill="#121212"
      />
      <path
        d="M38.7 15H36L32.7 24L36 33H38.7L35.4 24L38.7 15Z"
        fill="#121212"
      />
    </svg>
  );
};
