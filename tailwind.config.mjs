/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#673ab6",
        "driveflow-primary": "#7e36e2",
        "status-available": "#98A869",
        "background-light": "#f7f6f8",
        "background-dark": "#18141e",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "space": ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [],
}

