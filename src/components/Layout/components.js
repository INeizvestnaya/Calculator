import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBackground};
  @media (orientation: portrait) {
    & {
      min-height: 8%;
    }
  }
  @media (orientation: landscape) {
    & {
      min-height: 12%;
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
  font-size: 80%;
  &:hover {
    color: ${({ theme }) => theme.colors.links};
  }
  &.active {
    color: ${({ theme }) => theme.colors.links};
    text-decoration: underline;
  }
`;

const LayoutWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;

export { HeaderContainer, HeaderLabel, HeaderLink, LayoutWrapper };
