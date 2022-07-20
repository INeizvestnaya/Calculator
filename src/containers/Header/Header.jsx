import { HeaderContainer, HeaderLabel, HeaderLink } from './components';

function Header() {
  return (
    <HeaderContainer>
      <HeaderLabel>Calculator App</HeaderLabel>
      <div>
        <HeaderLink to="calculator-functional" data-link="functional">
          Functions
        </HeaderLink>
        <HeaderLink to="calculator-class" data-link="class">
          Classes
        </HeaderLink>
        <HeaderLink to="settings" data-link="settings">
          Settings
        </HeaderLink>
      </div>
    </HeaderContainer>
  );
}

export default Header;
