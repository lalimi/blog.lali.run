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
          50: '#E6F7F7',
          100: '#B3E8E8',
          200: '#80D9D9',
          300: '#4DCACA',
          400: '#2BBCBC',
          500: '#0f8f98', // Base light
          600: '#0b6e74', // Base support
          700: '#134E5E', // Base accent
          800: '#0B3037', // Base primary
          900: '#04161a', // Base dark
          950: '#020B0D',
          primary: '#0B3037',
          accent: '#134E5E',
          support: '#0b6e74',
          light: '#0f8f98',
          dark: '#04161a',
          muted: '#2a4d63',
          bright: '#4ECDC4', // Highlight color
        },
        'emerald': {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        'brand-bg': '#F5F7F8',
        'brand-text': '#111827',
        'warm-white': '#E2E2E0',
      },
      fontFamily: {
        'display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'body': ['Tinos', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
      },
      borderRadius: {
        'large': '14px',
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        'hero-teal': 'radial-gradient(1200px circle at 70% 10%, #134E5E 0%, rgba(19,78,94,0.6) 35%, rgba(11,48,55,0.8) 60%, #0B3037 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(135deg, #0b6e74 0%, #0f8f98 100%)',
        'gradient-teal-dark': 'linear-gradient(135deg, #0B3037 0%, #134E5E 100%)',
        'gradient-teal-bright': 'linear-gradient(135deg, #0f8f98 0%, #4ECDC4 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(15, 143, 152, 0.3)',
        'glow-lg': '0 0 40px rgba(15, 143, 152, 0.4)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 143, 152, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 143, 152, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
