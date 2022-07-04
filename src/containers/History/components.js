import styled from 'styled-components';

const HistoryWrapper = styled.div`
  @media (orientation: portrait) {
    & {
      height: 38vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 88vh;
      width: 25vw;
    }
  }
  display: flex;
  flex-direction: column;
`;

const HistoryLabel = styled.div`
  text-align: center;
  padding: 5%;
`;

export { HistoryWrapper, HistoryLabel };
