/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      colors: {
        primary: {
          DEFAULT: '#5b3926',
          // DEFAULT: '#f6931e',
          light: '#F5F5F5',
          hover_light: '#ECD9C1',
          light_yellow:'#F1E7DB',
          dark: '#604432',

        },
        accent: '#5b3926',
        
        text:'#5b3926',
        border: '#704f3a',
      },

    },
  },
  plugins: [],
}

