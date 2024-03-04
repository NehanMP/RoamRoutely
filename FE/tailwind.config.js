/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('./src/assets/bg.jpg')",
      },
      fontFamily: {
        body: ["Poppins"],
      },
    },
  },
  plugins: [],
};
