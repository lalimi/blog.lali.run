/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'deep-teal': {
          primary: '#0B3037',
          accent: '#134E5E',
          support: '#0b6e74',
          light: '#0f8f98',
          dark: '#04161a',
          muted: '#2a4d63'
        },
        'teal-gradient': {
          'from-support': '#0b6e74',
          'to-light': '#0f8f98',
          'from-accent': '#134E5E',
          'to-primary': '#0B3037',
          'from-muted': '#2a4d63',
          'to-support': '#0b6e74',
          'from-primary': '#0B3037',
          'to-dark': '#04161a'
        },
        'brand-bg': '#F5F7F8',
        'brand-text': '#111827'
      },
      fontFamily: {
        'display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
      },
      borderRadius: {
        'large': '14px'
      },
      backgroundImage: {
        'hero-teal': 'radial-gradient(1200px circle at 70% 10%, #134E5E 0%, rgba(19,78,94,0.6) 35%, rgba(11,48,55,0.8) 60%, #0B3037 100%)'
      }
    },
  },
  plugins: [],
};
