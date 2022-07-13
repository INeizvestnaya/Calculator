import styled from 'styled-components';

const DisplayWrapper = styled.div`
  @media (orientation: portrait) {
    & {
      height: 10vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 17vh;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 0% 6% 0% 6%;
`;

const CurrentExpression = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.font};
  @media (orientation: portrait) {
    & {
      height: 5vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 9vh;
    }
  }
`;
const CurrentHistory = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.font};
  @media (orientation: portrait) {
    & {
      height: 2vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 5vh;
    }
  }
`;

export { DisplayWrapper, CurrentExpression, CurrentHistory };
