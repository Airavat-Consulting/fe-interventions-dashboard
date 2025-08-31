/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16A34A',
          light: '#22C55E'
        },
        background: '#ffffff',
        border: '#e5e7eb'
      },
      borderRadius: {
        'md': '0.375rem'
      }
    }
  },
  plugins: []
};