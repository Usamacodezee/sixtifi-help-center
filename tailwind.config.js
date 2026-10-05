/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF8FF',
          100: '#D1E9FF',
          200: '#B2DDFF',
          500: '#2E90FA',
          600: '#175CD3',
          700: '#0F47A6',
          800: '#113876',
        }
      }
    },
  },
  plugins: [],
}
