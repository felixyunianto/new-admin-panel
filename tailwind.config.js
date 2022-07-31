module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'bg-sidebar-1' : '#52B2FE',
      'bg-sidebar-2' : '#3A8BFE'
     }),
    extend: {
      width: {
        'side-left' : '250px'
      }
    },
  },
  variants: {
    extend: {
      display : ['group-hover', 'hover']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
