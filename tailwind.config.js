/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/pages/*.{js,jsx,ts,tsx}',
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
      dropShadow: {
        'sm-w': '0 1px 1px rgba(255, 255, 255, 0.05)',
        w: [
          '0 1px 2px rgba(255, 255, 255, 0.1)',
          '0 1px 1px rgba(255, 255, 255, 0.06)',
        ],
        'md-w': [
          '0 4px 3px rgba(255, 255, 255, 0.1)',
          '0 2px 2px rgba(255, 255, 255, 0.2)',
        ],
        'lg-w': [
          '0 10px 8px rgba(255, 255, 255, 0.04)',
          '0 4px 3px rgba(255, 255, 255, 0.1)',
        ],
      },
      colors: {
        blackish: 'rgb(15,15,15)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
