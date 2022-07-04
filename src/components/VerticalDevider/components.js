import styled from 'styled-components';

const VerticalLine = styled.div`
  height: 78vh;
  width: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  margin: 5vh 0px 5vh 0px;
  @media (orientation: portrait) {
    & {
      display: none;
    }
  }
`;

export default VerticalLine;
