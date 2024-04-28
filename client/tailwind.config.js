/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'welcome-page-color' :'#222222',
        'default-color' : '#ececec',
        'dark-default-color':'#D4D4D4',
        'entry-background':'#141414',
      },
      boxShadow: {
        'custom-shadow': '0 0 0 4px #686868',
      },
    },
  },
  plugins: [],
}