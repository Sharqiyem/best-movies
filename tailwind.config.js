/** @type {import('tailwindcss').Config} */

// const {Colors} = require('@src/constants/colors');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          900: '#ff6347',
        },
      },
    },
  },
  plugins: [],
};
