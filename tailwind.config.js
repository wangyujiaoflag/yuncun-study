/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      important: true,
    },
  },
  plugins: [],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
};
