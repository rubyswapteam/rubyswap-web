import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const VerifiedBadgeIcon: React.FC<Props> = ({ width, height }): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33909 19.3278C6.33802 20.166 6.53963 20.7864 6.94391 21.1889C7.34713 21.5926 7.95889 21.7911 8.77923 21.7847H10.6049C10.6812 21.7818 10.7573 21.7946 10.8284 21.8222C10.8996 21.8498 10.9644 21.8917 11.0188 21.9453L12.3183 23.23C12.9087 23.8199 13.4873 24.1132 14.0542 24.11C14.621 24.1068 15.1996 23.8134 15.79 23.23L17.0735 21.9453C17.1297 21.8911 17.1965 21.8489 17.2695 21.8213C17.3426 21.7937 17.4206 21.7812 17.4986 21.7847H19.3131C20.142 21.7858 20.7596 21.584 21.166 21.1793C21.5725 20.7746 21.7757 20.1542 21.7757 19.3181V17.5019C21.7715 17.3445 21.8291 17.1918 21.9361 17.0764L23.2196 15.7917C23.8174 15.204 24.1142 14.6253 24.11 14.0558C24.1057 13.4863 23.8089 12.9071 23.2196 12.3183L21.9361 11.0336C21.8288 10.9184 21.7712 10.7655 21.7757 10.6081V8.79185C21.7746 7.95467 21.573 7.33429 21.1709 6.93069C20.7687 6.52709 20.1494 6.32528 19.3131 6.32528H17.4986C17.4206 6.32849 17.3427 6.31593 17.2697 6.28834C17.1966 6.26075 17.1299 6.21869 17.0735 6.1647L15.79 4.88002C15.1996 4.29015 14.621 3.99681 14.0542 4.00003C13.4873 4.00324 12.9087 4.29657 12.3183 4.88002L11.0188 6.1647C10.9642 6.21806 10.8995 6.25981 10.8283 6.28741C10.7572 6.31501 10.6812 6.32789 10.6049 6.32528H8.77923C7.95141 6.32635 7.33589 6.52655 6.93267 6.92586C6.52946 7.32518 6.32785 7.94718 6.32785 8.79185V10.6129C6.33235 10.7703 6.27471 10.9232 6.16742 11.0384L4.88397 12.3231C4.29466 12.9108 4 13.49 4 14.0606C4 14.6312 4.29841 15.2115 4.89521 15.8014L6.17866 17.086C6.28565 17.2014 6.34324 17.3542 6.33909 17.5116V19.3278Z"
        fill="#4673FA"
      />
      <path
        d="M13.9964 17.491C13.8069 17.7797 13.5273 17.942 13.2025 17.942C12.8687 17.942 12.6071 17.8067 12.3635 17.491L10.2345 14.8929C10.0812 14.7034 10 14.505 10 14.2885C10 13.8374 10.3428 13.4856 10.7848 13.4856C11.0555 13.4856 11.272 13.5848 11.4885 13.8645L13.1664 16.0025L16.7298 10.2831C16.9192 9.97637 17.1628 9.83203 17.4334 9.83203C17.8574 9.83203 18.2543 10.1297 18.2543 10.5718C18.2543 10.7793 18.1461 10.9958 18.0288 11.1852L13.9964 17.491Z"
        fill="white"
      />
    </svg>
  );
};

export default VerifiedBadgeIcon;
