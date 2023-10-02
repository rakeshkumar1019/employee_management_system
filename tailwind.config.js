/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'employee-blue': '#1DA1F2',
        'secondary':'#949C9E',
        'secondary-gray':'#F2F2F2',
        'secondary-blue':'#1DA1F2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

