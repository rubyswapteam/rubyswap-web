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
        sans: ['Biotif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
