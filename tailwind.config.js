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
        // Elegant wedding palette: soft blush pink, warm beige, charcoal
        primary: {
          50: "#fdf2f2", // Very light blush
          100: "#fce8e8", // Light blush
          200: "#f9d1d1", // Medium-light blush
          300: "#f5b5b5", // Medium blush
          400: "#f08888", // Medium-dark blush
          500: "#E8C4C4", // Main soft blush pink
          600: "#e09999", // Darker blush
          700: "#d66666", // Deep blush
          800: "#c44444", // Very deep blush
          900: "#a83333", // Dark rose
        },
        // Secondary warm beige/champagne palette
        secondary: {
          50: "#fefdfb",
          100: "#fcf9f4",
          200: "#f7f0e6",
          300: "#f1e6d4",
          400: "#eadbbf",
          500: "#D4C4A8", // Main warm beige/champagne
          600: "#c4ae8f",
          700: "#b39976",
          800: "#9d845e",
          900: "#876f47",
        },
        // Core colors
        white: "#ffffff",
        black: "#2C2C2C", // Deep charcoal black
        // Main accent colors
        blush: "#E8C4C4", // Main soft blush pink
        champagne: "#D4C4A8", // Main warm beige/champagne
        charcoal: "#2C2C2C", // Deep charcoal
        // For consistent alternating backgrounds
        background: {
          primary: "#ffffff", // Clean white
          secondary: "#fdf2f2", // Very light blush
          tertiary: "#fefdfb", // Very light champagne
        },
        // Interactive states
        accent: {
          DEFAULT: "#E8C4C4", // Soft blush pink for active/hover/focus
          hover: "#e09999", // Darker blush for hover
          active: "#d66666", // Even darker for active
        },
        // Text colors
        text: {
          primary: "#2C2C2C", // Dark charcoal for headers
          secondary: "#666666", // Medium gray for body text
          light: "#888888", // Light gray for subtle text
        },
        // Keep gray scale for borders/subtle elements
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
