/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E0F7FA', // ice blue
          DEFAULT: '#4FC3F7',
          dark: '#0288D1',
        },
        secondary: {
          light: '#F5F5F5',
          DEFAULT: '#FFFFFF', // deep white
          dark: '#E0E0E0',
        },
        accent: {
          DEFAULT: '#FF4081',
        },
        success: {
          DEFAULT: '#4CAF50',
        },
        warning: {
          DEFAULT: '#FFC107',
        },
        error: {
          DEFAULT: '#F44336',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        '3d': '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)',
        'card': '0 15px 30px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.05)',
        'hover': '0 15px 35px rgba(0, 0, 0, 0.15), 0 10px 15px rgba(0, 0, 0, 0.08)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
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
};