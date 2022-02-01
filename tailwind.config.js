module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ['10px', '20px'],
      base: ['12px', '24px'],
      lg: ['18px', '28px'],
      xl: ['22px', '32px'],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
    },
  },
  plugins: [],
};
