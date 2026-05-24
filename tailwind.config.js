/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}", // <-- Add this explicitly
    "./src/components/**/*.{js,ts,jsx,tsx}", // <-- Add this explicitly
  ],
  theme: {
    extend: {
      colors: {
        "gov-navy": "#091e36",
        "gov-blue": "#0f3a60",
        "gov-accent": "#b0c4de",
        "gov-darkText": "#0f172a",
      },
    },
  },
  plugins: [],
};
