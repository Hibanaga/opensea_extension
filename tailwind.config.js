module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#5fe1ff',
        'secondary-blue': '#01a8ce',
      },
	  fontFamily: {
      proxima: 'Proxima, mono, serif',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
