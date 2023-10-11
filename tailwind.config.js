/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        test: "rgba(0, 0, 0, 0.8)",
        card: "rgba(255, 255, 255, 0.2)",
        myGrey: "#EFF0F3",
      },
      backgroundImage: {
        "black-gradient": "linear-gradient(45deg, #000000, #282828)",
        custom: "url('/public/img/manuBanner.jpg')",
      },
      fontFamily: {
        "main-font": "'Lato', sans-serif",
        "title-font": "'Playfair Display', serif;",
      },
      colors: {
        "my-gold": "#D6B06B",
      },
      boxShadow: {
        custom: "30px 0px 15px 5px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
