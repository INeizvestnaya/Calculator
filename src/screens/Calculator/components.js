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
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;

const FunctionalityWrapper = styled.div`
  @media (orientation: landscape) {
    & {
      width: 75vw;
    }
  }
`;

export { CalculatorWrapper, FunctionalityWrapper };
