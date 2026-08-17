/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0a500',
        'primary-dark': '#c8860a',
        dark: '#0d0d0d',
        'dark-2': '#141414',
        'dark-3': '#1a1a1a',
        'dark-4': '#1e1e1e',
        'dark-5': '#242424',
        'card-bg': '#1c1c1c',
        accent: '#e63946',
        'text-muted': '#999999',
        'text-light': '#cccccc',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgba(13,13,13,0.92) 40%, rgba(13,13,13,0.5) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f0a500 0%, #c8860a 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
