import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  display: flex;
  height: 100vh;
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
      width: ${(props) => (props.showHistory ? '75vw' : '95vw')};
    }
  }
`;

export { CalculatorWrapper, FunctionalityWrapper };
