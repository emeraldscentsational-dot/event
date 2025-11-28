/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005F61",
        primaryLight: "#008C8F",
        grayLight: "#F2F2F2",
        secondaryLight: "#F78105",
        bodyLight: "#535353",
        mainLight: "#1E1E1E",
        white: "#fff",
        green: "#005153",
        gold: "#E67505",
        cream: "#FFF8F0",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat"],
        garamond: ["Garamond"],
      },
    },
  },
  plugins: [],
};
