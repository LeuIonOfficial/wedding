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
        // Refined 2025 palette: rose quartz, linen, deep charcoal, subtle grays
        primary: {
          50: "#F8F4F6",
          100: "#F1E8ED",
          200: "#E6D5DE",
          300: "#D9BECF",
          400: "#CBA7BE",
          500: "#B98FAE",
          600: "#A7779E",
          700: "#8E5F84",
          800: "#744C6B",
          900: "#5C3C55",
        },
        // Secondary warm linen/champagne palette
        secondary: {
          50: "#FAF7F2",
          100: "#F5EFE6",
          200: "#EDE3D0",
          300: "#E3D5BA",
          400: "#D6C7A8",
          500: "#C7B491",
          600: "#B29F7C",
          700: "#9C8866",
          800: "#857253",
          900: "#6E5C42",
        },
        // Core colors
        white: "#ffffff",
        black: "#1E1E1E", // Inky charcoal black
        // Semantic tokens for legacy references
        blush: "#B98FAE", // Soft rose quartz
        champagne: "#C7B491", // Warm linen/champagne
        charcoal: "#1E1E1E", // Deep charcoal
        // Surfaces
        background: {
          primary: "#FFFEFD", // Off-white
          secondary: "#FAF7F2", // Linen tint
          tertiary: "#F8F4F6", // Rose quartz tint
        },
        // Interactive states
        accent: {
          DEFAULT: "#B47C7C", // Dusty rose for CTAs
          hover: "#A36F6F",
          active: "#8E5F5F",
          dark: "#7A5151",
        },
        // Text colors
        text: {
          primary: "#1E1E1E",
          secondary: "#4B5563",
          light: "#6B7280",
        },
        // Grays for borders/subtle elements
        gray: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#e4e4e4",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
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
