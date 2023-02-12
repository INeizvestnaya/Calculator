import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  display: flex;
  @media (orientation: portrait) {
    & {
      flex-direction: column;
      height: 92%;
    }
  }
  @media (orientation: landscape) {
    & {
      flex-direction: row;
      height: 88%;
    }
  }
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;

const FunctionalityWrapper = styled.div`
  @media (orientation: landscape) {
    & {
      width: ${(props) => (props.showHistory ? '75%' : '95%')};
    }
  }
  @media (orientation: portrait) {
    & {
      min-height: 50%;
    }
  }
`;

export { CalculatorWrapper, FunctionalityWrapper };
