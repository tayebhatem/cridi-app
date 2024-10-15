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
        "light-500":"#484b6a",
        "dark-500":"#121212",
        "dark-400":"#282828",
        "dark-300":"#3f3f3f",
        "dark-200":"#575757",
        "dark-100":"#717171",
        "dark-50":"#8b8b8b",
      },
      fontFamily:{
        spaceMono: ['SpaceMono', 'monospace'],
         kufi: ['Kufi-Regular', 'sans-serif'],
        'kufi-bold': ['Kufi-Bold', 'sans-serif'],
        'kufi-semi-bold': ['Kufi-SemiBold', 'sans-serif'],
        'kufi-medium': ['Kufi-Medium', 'sans-serif'],
        'kufi-light': ['Kufi-Light', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

