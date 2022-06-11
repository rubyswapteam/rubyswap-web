/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './next.config.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        circularstdbold: 'CircularStd-Bold, sans-serif',
        circularstdmedium: 'CircularStd-Medium, sans-serif',
        circularstdbook: 'CircularStd-Book, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
