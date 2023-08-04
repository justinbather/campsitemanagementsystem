/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    require.resolve("react-widgets/styles.css"),
  ],
  theme: {
    colors: {
      "primary-color": "#FFFFFFF",
      "stroke-color": "#AEB5BF",
      "blue-primary": "#3995F4",
      "form-color": "#EEF5FB",
    },
    scale: {
      40: ".80",
    },
    extend: {},
  },
  plugins: [require("react-widgets-tailwind")],
};
