/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  presets: [require("@appsignal-tools/design-system/tailwind.config")],
  plugins: [require("@tailwindcss/typography")],
};
