/** @type {import('tailwindcss').Config} */
const color = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  safelist: [
    "lg:items-end",
    "lg:items-start",
    "lg:items-center",
    "lg:justify-start",
    "lg:justify-center",
    "lg:justify-end",
    "lg:justify-between",
    "lg:flex",
    "lg:flex-col",
    "lg:flex-row",
  ],
  theme: {
    extend: {
      colors: {
        primary: color.blue,
      },
    },
  },
  plugins: [],
};
