export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#e6e6e6',
        surface: '#e8e4dc',
        text:    '#111111',
        muted:   '#555555',
        border:  '#d1d1d1',
        accent:  '#0a0a0a',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        pill:    '4px',
      },
    },
  },
  plugins: [],
};
