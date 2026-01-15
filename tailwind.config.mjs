/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#673ab6",
        "driveflow-primary": "#7e36e2",
        "driveflow-primary": "#7e36e2",
        "booking-primary": "#006c75",
        "status-available": "#98A869",
        "status-green": "#98A869",
        "status-orange": "#f59e0b",
        "status-red": "#ef4444",
        "booking-bg-dark": "#22262a",
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

