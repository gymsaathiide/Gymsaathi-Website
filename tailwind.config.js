/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE7900',
        secondary: '#1E293B',
        dark: '#0F172A',
        light: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
