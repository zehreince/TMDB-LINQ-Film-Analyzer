/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
      colors: {
        dark: '#14181c', 
        card: '#1b2228', 
        brand: '#00e676', 
      }
    },
  },
  plugins: [],
}