import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const LooksRareIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
        fill="#0CE466"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.99982 11.0807C8.8559 11.0807 7.92773 10.1534 7.92773 9.00859C7.92773 7.86375 8.8559 6.93652 9.99982 6.93652C11.1437 6.93652 12.0719 7.86375 12.0719 9.00859C12.0719 10.1534 11.1437 11.0807 9.99982 11.0807ZM9.0989 9.00859C9.0989 9.50634 9.50246 9.90948 9.99982 9.90948C10.4972 9.90948 10.9007 9.50634 10.9007 9.00859C10.9007 8.51084 10.4972 8.10769 9.99982 8.10769C9.50246 8.10769 9.0989 8.51084 9.0989 9.00859Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.33398 9.01163L7.29794 5.04492H12.7033L16.6673 9.01163L10.0007 15.6755L3.33398 9.01163ZM13.0637 7.56742C11.3794 5.87578 8.62184 5.87578 6.93759 7.56744L5.49615 9.0089L6.93759 10.4503C8.62184 12.142 11.3794 12.142 13.0637 10.4503L14.5051 9.0089L13.0637 7.56742Z"
        fill="black"
      />
    </svg>
  );
};

export default LooksRareIcon;
