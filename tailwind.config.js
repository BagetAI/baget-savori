/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-karla)"],
        heading: ["var(--font-sora)"],
      },
      colors: {
        savori: {
          lavender: "#F0EDFF",
          violet: "#4C1D95",
          teal: "#14B8A6",
          peach: "#FBBF77",
          saffron: "#E89E1A",
          red: "#A63D2D",
        },
      },
    },
  },
  plugins: [],
};
