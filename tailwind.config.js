/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        surface: '#111111',
        primary: '#F97316',
        secondary: '#FB923C',
        highlight: '#FDBA74',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        border: 'rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(249, 115, 22, 0.15)',
        'glow-lg': '0 0 80px rgba(249, 115, 22, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}