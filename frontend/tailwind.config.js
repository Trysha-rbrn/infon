/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef0fb',
          100: '#d5d9f4',
          200: '#abb3e9',
          300: '#808de0',
          400: '#5667d6',
          500: '#2d3561',
          600: '#252c54',
          700: '#1e2347',
          800: '#161a39',
          900: '#1a1f5e',
          950: '#0d1030',
        },
        gold: {
          400: '#fbbf24',
          500: '#f5a623',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
