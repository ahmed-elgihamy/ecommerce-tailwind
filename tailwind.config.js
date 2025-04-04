/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Raleway", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('/src/assets/hero.jfif')",
        button: "url('/src/assets/button.jfif')",
        banner: "url('/src/assets/banner.jfif')",
      },
    },
  },
  plugins: [],
}


