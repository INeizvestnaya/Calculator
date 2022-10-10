import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  @media (max-width: 1000px) {
    html {
      font-size: 30px;
    }
  }
  @media (max-width: 750px) {
    html {
      font-size: 25px;
    }
  }
  @media (max-width: 600px) {
    html {
      font-size: 20px;
    }
  }
  @media (max-width: 500px) {
    html {
      font-size: 15px;
    }
  }
  @media (max-width: 350px) {
    html {
      font-size: 10px;
    }
  }
  @media (min-width: 1001px) {
    html {
      font-size: 35px;
    }
  }
`;

export default GlobalStyles;
