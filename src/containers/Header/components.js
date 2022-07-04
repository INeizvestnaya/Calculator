import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGrey};
  @media (orientation: portrait) {
    & {
      height: 10vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 12vh;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
`;

const HeaderLabel = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey};
`;

const HeaderLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.lightGrey};
  text-decoration: none;
  padding: 0px 10px 0px 10px;
  font-size: 0.8rem;
  &:hover {
    color: ${({ theme }) => theme.colors.headerLinks};
  }
  &.active {
    color: ${({ theme }) => theme.colors.headerLinks};
    text-decoration: underline;
  }
`;

export { HeaderContainer, HeaderLabel, HeaderLink };
