module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'system-red':'#c80003',
        'system-green':'#a6c64c',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
   require('@tailwindcss/forms'),
  ],
}
