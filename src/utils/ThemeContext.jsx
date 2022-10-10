import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { LIGHT, COLORED, DARK } from '@Constants/themes';
import themes from '@Utils/StyleTheme';

const defaultThemeType = localStorage.getItem('theme') || LIGHT;

const aaa = (theme) => {
  switch (theme) {
    case COLORED:
      return { type: COLORED, value: themes.colored };
    case DARK:
      return { type: DARK, value: themes.dark };
    case LIGHT:
      return { type: LIGHT, value: themes.light };
    default:
      return { type: LIGHT, value: themes.light };
  }
};

const ThemeContext = React.createContext({
  theme: aaa(defaultThemeType),
  changeTheme: () => {}
});

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(aaa(defaultThemeType));

  const changeTheme = (t) => {
    setTheme(aaa(t));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme.type);
  }, [theme]);

  const memoizedContextValue = useMemo(
    () => ({
      theme,
      changeTheme
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={memoizedContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { ThemeContext, ThemeContextProvider };
