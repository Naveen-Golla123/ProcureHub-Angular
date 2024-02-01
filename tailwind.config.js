/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#621E72",
        secondary: "#621E72",
        accent: "79003A",
        background: "#C6C1EA"
      },
      textColor:{
        primary: "#621E72"
      },
      fontFamily: {
        custom : ["Comic Sans MS", "Comic Sans", "cursive"]
      }
    },
  },
  plugins: [],
}

