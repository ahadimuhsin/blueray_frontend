/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{vue,js}",
    "./node_modules/vue3-tailwind-modal/**/*.js",
  ],
  theme: {
    extend: {colors},
  },
  plugins: [],
}

