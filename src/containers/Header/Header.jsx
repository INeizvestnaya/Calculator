import { HeaderContainer, HeaderLabel, HeaderLink } from './components';

function Header() {
  return (
    <HeaderContainer>
      <HeaderLabel>Calculator App</HeaderLabel>
      <div>
        <HeaderLink to="calculator-functional">Functions</HeaderLink>
        <HeaderLink to="calculator-class">Classes</HeaderLink>
        <HeaderLink to="settings">Settings</HeaderLink>
      </div>
    </HeaderContainer>
  );
}

export default Header;
