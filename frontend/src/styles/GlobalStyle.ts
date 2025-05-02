import { createGlobalStyle } from 'styled-components';
import ImageDetail from '../assets/images/fundoDetail.png';
export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: url(${ImageDetail});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  :focus {
    outline: none !important;
  }
`;
