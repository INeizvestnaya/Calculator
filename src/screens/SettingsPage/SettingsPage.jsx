import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import { LIGHT, DARK, COLORED } from '@Constants/themes';
import {
  SettingsLabel,
  SelectTheme,
  ThemeOption,
  SelectLabel,
  SelectContainer,
  ClearButton,
  PageWrapper
} from './components';

function SettingsPage({ changeTheme, selectedValue }) {
  const ctx = useContext(CalculatorContext);

  const selectChange = (event) => {
    changeTheme(event.target.value);
  };

  const clearHistory = () => {
    ctx.clearHistory();
  };

  return (
    <PageWrapper data-settings-wrapper>
      <SettingsLabel>Settings</SettingsLabel>
      <SelectContainer>
        <SelectLabel>Switch Theme</SelectLabel>
        <SelectTheme onChange={selectChange} value={selectedValue}>
          <ThemeOption value={LIGHT}>Light theme</ThemeOption>
          <ThemeOption value={COLORED}>Colored theme</ThemeOption>
          <ThemeOption value={DARK}>Dark theme</ThemeOption>
        </SelectTheme>
      </SelectContainer>
      <ClearButton onClick={clearHistory} data-clear-hist>
        Clear all history
      </ClearButton>
    </PageWrapper>
  );
}

SettingsPage.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default SettingsPage;
