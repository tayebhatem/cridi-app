/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary-500": "#059669",
        "light-100":"#FAFAFA",
        "light-200":"#e4e5f1",
        "light-300":"#d2d3db",
        "light-400":"#9394a5",
        "light-500":"#484b6a"
      }
    },
  },
  plugins: [],
}

