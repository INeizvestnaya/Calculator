import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBackground};
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
  color: ${({ theme }) => theme.colors.headerText};
`;

const HeaderLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  padding: 0px 10px 0px 10px;
  font-size: 0.8rem;
  &:hover {
    color: ${({ theme }) => theme.colors.links};
  }
  &.active {
    color: ${({ theme }) => theme.colors.links};
    text-decoration: underline;
  }
`;

export { HeaderContainer, HeaderLabel, HeaderLink };
