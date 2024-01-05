/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grey: '#363636',
      white: '#ffffff',
      grey_hover: '#292929',
      light_grey: '#eeeeee',
      card_grey_hover: '#d8d8d8',
      green: '#376637',
      yellow: '#feb017',
      yellow_hover: '#de970b',
      red: '#b71922',
      red_hover: '#85070e',
      red_error: '#f44336',
    },
    extend: {},
  },
  plugins: [],
};
