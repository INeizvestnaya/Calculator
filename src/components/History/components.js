import styled from 'styled-components';

const HistoryWrapper = styled.div`
  @media (orientation: landscape) {
    & {
      width: 25%;
    }
  }
  @media (orientation: portrait) {
    & {
      height: 45%;
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

const HistoryItem = styled.div`
  font-size: 70%;
  margin: 3% 7% 0% 7%;
  color: ${({ theme }) => theme.colors.font};
`;

const ItemsWrapper = styled.div`
  margin-bottom: 20px;
  overflow: auto;
`;

export { HistoryWrapper, HistoryLabel, HistoryItem, ItemsWrapper };
