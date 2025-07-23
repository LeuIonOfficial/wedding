/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem", // 10px
      },
      colors: {
        primary: {
          50: "#d1e8df",
          100: "#a3d1c0",
          200: "#8cc4a8",
          300: "#75baa1",
          400: "#5ea08a",
          500: "#4e8c6c",
          600: "#3d7355",
          700: "#2d5a3e",
          800: "#1c4027",
          900: "#0c2710",
        },
        secondary: {
          50: "#fdf2f0",
          100: "#fbe5e1",
          200: "#f7cbc3",
          300: "#f3b1a5",
          400: "#ef9787",
          500: "#f0a799",
          600: "#e8856b",
          700: "#df633d",
          800: "#b8502f",
          900: "#7a3520",
        },
        neutral: {
          50: "#ffffff",
          100: "#f8f9fa",
          200: "#f5f5f5",
          300: "#eeeeee",
          400: "#cccccc",
          500: "#888888",
          600: "#666666",
          700: "#444444",
          800: "#222222",
          900: "#000000",
        },
        accent: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e8e8e8",
          300: "#d0d0d0",
          400: "#b8b8b8",
          500: "#a0a0a0",
          600: "#888888",
          700: "#707070",
          800: "#585858",
          900: "#404040",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        cursive: ["var(--font-dancing)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 1.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
