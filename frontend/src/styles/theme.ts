import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#d32f2f',
    secondary: '#ffcc80',
    background: '#fffaf0',
    text: '#333333',
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
  media: {
    xs: '(max-width: 480px)',
    sm: '(max-width: 600px)',
    md: '(max-width: 768px)',
    lg: '(max-width: 1024px)',
    xl: '(max-width: 1200px)',
    xxl: '(max-width: 1400px)',
  },

};

export { theme };