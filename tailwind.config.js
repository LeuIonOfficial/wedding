/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      colors: {
        primary: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#cccccc',
          400: '#888888',
          500: '#444444',
          600: '#222222',
          700: '#111111',
          800: '#000000',
          900: '#000000',
        },
        accent: {
          light: '#eeeeee',
          DEFAULT: '#cccccc',
          dark: '#888888',
        },
        secondary: {
          light: '#f5f5f5',
          DEFAULT: '#eeeeee',
          dark: '#cccccc',
        },
        elegant: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#cccccc',
          400: '#888888',
          500: '#444444',
          600: '#222222',
          700: '#111111',
          800: '#000000',
          900: '#000000',
        },
        themegreen: {
          light: '#a3d1c0',
          DEFAULT: '#75baa1',
          dark: '#4e8c6c',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        cursive: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}