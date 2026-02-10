/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep ocean-inspired palette for data/AI governance
        bao: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b9e7ff',
          300: '#89d9ff',
          400: '#52c2ff',
          500: '#2aa3ff',
          600: '#1483f5',
          700: '#0d6be1',
          800: '#1257b6',
          900: '#154a8f',
          950: '#0f2d57',
        },
        night: {
          50: '#f4f6fb',
          100: '#e8ecf6',
          200: '#cbd7eb',
          300: '#9db5da',
          400: '#688dc4',
          500: '#466eae',
          600: '#355692',
          700: '#2c4677',
          800: '#283d63',
          900: '#1a2744',
          950: '#0d141f',
        },
        mint: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(42, 163, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(42, 163, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
