/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#FF2D55',
          dark: '#D92B3A',
        },
        background: '#F8F8F8',
        text: {
          primary: '#1C1C1E',
          secondary: '#686C76',
        },
        success: '#26A65B',
        border: '#E8E8E8',
        gray: {
          light: '#F2F2F2',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
