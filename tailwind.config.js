/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './next.config.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Biotif', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'theme-gradient': "url('../assets/gradient/theme.svg')",
      },
      height: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
