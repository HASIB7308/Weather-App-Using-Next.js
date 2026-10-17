/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17233B",
        dusk: "#2B3F63",
        sky: "#DCEBF5",
        mist: "#F3F8FB",
        sun: "#F2B134",
        sea: "#2A8C8C",
      },
      fontFamily: {
        sans: ["var(--font-main)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
