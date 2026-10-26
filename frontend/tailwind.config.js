/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#fe538d",
          yellow: "#ffb703",
          dark: "#222725",
          soft: "#f6f7f5",
        },
      },
      fontFamily: {
        sans: ["Rubik", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
