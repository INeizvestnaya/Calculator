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
  @media (orientation: portrait) {
    & {
      padding: 2%;
    }
  }
  @media (orientation: landscape) {
    & {
      padding: 5%;
    }
  }
  color: ${({ theme }) => theme.colors.font};
`;

const ItemsWrapper = styled.div`
  margin-bottom: 20px;
  overflow: auto;
`;

export { HistoryWrapper, HistoryLabel, ItemsWrapper };
