import styled from 'styled-components';

const ErrorPageLabel = styled.div`
  margin-top: 5vh;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.font};
`;

const ErrorPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBackground};
  @media (orientation: portrait) {
    & {
      height: 90vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 88vh;
    }
  }
`;

export { ErrorPageLabel, ErrorPageWrapper };
