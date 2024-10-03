/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'berkshire-c' : '"Berkshire Swash", serif',
      },
      colors:{
        'primary-c' :"#37c7be"
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui'),],
}

