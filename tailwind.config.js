/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,tsx}',
    './src/pages/**/*.{html,js,jsx,tsx}',
  ],
  options: {
    safelist: ['bg-gray-500', 'bg-amber-500', 'bg-red-500'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Biotif'],
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
        blackish: 'rgb(0,0,0)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
