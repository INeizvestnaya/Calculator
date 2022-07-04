import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  display: flex;
  @media (orientation: portrait) {
    & {
      flex-direction: column;
    }
  }
  @media (orientation: landscape) {
    & {
      flex-direction: row;
    }
  }
`;

const FunctionalityWrapper = styled.div`
  @media (orientation: landscape) {
    & {
      width: 75vw;
    }
  }
`;

export { CalculatorWrapper, FunctionalityWrapper };
