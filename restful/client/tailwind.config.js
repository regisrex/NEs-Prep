/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "button": {
          DEFAULT: "#482FF7"
        },
        "text" : {
          DEFAULT  : "#5D6E8B",
          "red" : "#ff7c6b"
        }
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}

