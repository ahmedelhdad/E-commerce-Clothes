/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        ground:"#203040",
        primary:"#f0c000"
      },
      container:{
        center:true,
        padding: '1rem'
      },
      backgroundImage:{
        'landing':"url('/images/IMAGE-landscape-fill-ee18eea3-13cf-4ca7-8d13-53b518bc4cf5-default_0.jpg')"
      }
    },
  },
  plugins: [],
}