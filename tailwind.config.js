/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,vue}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '0.25rem',
      },
      fontFamily: {
        sans: ['Roboto'],
      },
    },
  },
  plugins: [],
}
