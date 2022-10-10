import { useContext } from 'react';
import { ThemeContext } from '@Utils/ThemeContext.jsx';
import Layout from '@Components/Layout';
import {
  SettingsLabel,
  SelectTheme,
  ThemeOption,
  SelectLabel,
  SelectContainer,
  ClearButton
} from './components';
import { propTypes, themeOptions } from './settingsData';

const SettingsPageFunc = ({ clearHistory }) => {
  const theme = useContext(ThemeContext);

  const selectChange = (event) => {
    theme.changeTheme(event.target.value);
  };

  const handleClearHistory = () => {
    clearHistory();
  };

  return (
    <>
      <SettingsLabel>Settings functional</SettingsLabel>
      <SelectContainer>
        <SelectLabel>Switch Theme</SelectLabel>
        <SelectTheme onChange={selectChange} value={theme.theme.type}>
          {themeOptions.map((t) => {
            const { label, value } = t;
            return (
              <ThemeOption key={value} value={value}>
                {label}
              </ThemeOption>
            );
          })}
        </SelectTheme>
      </SelectContainer>
      <ClearButton onClick={handleClearHistory} data-clear-hist>
        Clear all history
      </ClearButton>
    </>
  );
};

SettingsPageFunc.propTypes = propTypes;

export default Layout(SettingsPageFunc);
