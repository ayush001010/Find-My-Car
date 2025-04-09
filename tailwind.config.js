/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- ADD THIS LINE
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Adjusted for JSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}