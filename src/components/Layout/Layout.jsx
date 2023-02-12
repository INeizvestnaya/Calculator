import {
  CALCULATOR_FUNCTIONAL,
  CALCULATOR_CLASS,
  SETTINGS_FUNC,
  SETTINGS_CLASS
} from '@Constants/paths';
import {
  HeaderContainer,
  HeaderLabel,
  HeaderLink,
  LayoutWrapper
} from './components';

const headerLinks = [
  { url: CALCULATOR_FUNCTIONAL, data: 'functional', text: 'Functions' },
  { url: CALCULATOR_CLASS, data: 'class', text: 'Classes' },
  { url: SETTINGS_FUNC, data: 'settings-func', text: 'Settings-func' },
  { url: SETTINGS_CLASS, data: 'settings-class', text: 'Settings-class' }
];

const Layout = (Component) => {
  const WithHeader = (props) => (
    <LayoutWrapper data-check-theme>
      <HeaderContainer>
        <HeaderLabel>Calculator App</HeaderLabel>
        <div>
          {headerLinks.map((link) => {
            const { text, url, data } = link;
            return (
              <HeaderLink key={text} to={url} data-link={data}>
                {text}
              </HeaderLink>
            );
          })}
        </div>
      </HeaderContainer>
      <Component {...props} />
    </LayoutWrapper>
  );
  WithHeader.displayName = `WithLayout(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithHeader;
};

export default Layout;
