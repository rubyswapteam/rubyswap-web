/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,tsx}',
    './src/pages/**/*.{html,js,jsx,tsx}',
  ],
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
      animation: {
        'rotate-one': 'rotate-one 1s ease-in-out infinite',
        'rotate-two': 'rotate-two 1s ease-in-out infinite',
        'rotate-three': 'rotate-three 1s ease-in-out infinite',
      },
      keyframes: {
        'rotate-one': {
          '0%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)' },
          '100%': {
            transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)',
          },
        },
        'rotate-two': {
          '0%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)' },
          '100%': {
            transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)',
          },
        },
        'rotate-three': {
          '0%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)' },
          '100%': {
            transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
