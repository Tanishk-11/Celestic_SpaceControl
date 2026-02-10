/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0B0D17', 
          800: '#151932',
          accent: '#D0A1FF' 
        }
      }
    },
  },
  plugins: [],
}