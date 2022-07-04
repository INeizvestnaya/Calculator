import styled from 'styled-components';

const HorizontalLine = styled.div`
  height: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  margin: 0% 4% 0% 4%;
`;

const MobileLine = styled(HorizontalLine)`
  @media (orientation: landscape) {
    & {
      display: none;
    }
  }
`;

export { HorizontalLine, MobileLine };
