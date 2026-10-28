/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        candy: "#f4a7c4",
        ink: "#493b4b",
        cream: "#fff8f3",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "20%": { transform: "translateY(0px)", opacity: "1" },
          "80%": { transform: "translateY(-50px)", opacity: "1" },
          "100%": { transform: "translateY(-100px)", opacity: "0" },
        },
      },
      animation: {
        "float-message": "floatUp 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
