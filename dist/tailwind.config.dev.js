"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable @typescript-eslint/no-var-requires */
var defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}', './next.config.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Biotif'].concat(_toConsumableArray(defaultTheme.fontFamily.sans))
      },
      backgroundImage: {
        'theme-gradient': "url('../assets/gradient/theme.svg')"
      },
      height: {
        inherit: 'inherit'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};