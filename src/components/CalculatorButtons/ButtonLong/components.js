import styled from 'styled-components';
import CButton from '../CalculatorButton/components';

const LongCButton = styled(CButton)`
  @media (max-width: 1000px) {
    height: 150px;
    border-radius: 15px;
  }
  @media (max-width: 750px) {
    height: 110px;
    border-radius: 15px;
  }
  @media (min-width: 1001px) {
    height: 220px;
    border-radius: 20px;
  }
`;

export default LongCButton;
