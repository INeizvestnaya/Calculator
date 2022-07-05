import PropTypes from 'prop-types';
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
  const selectChange = (event) => {
    changeTheme(event.target.value);
  };

  return (
    <PageWrapper>
      <SettingsLabel>Settings</SettingsLabel>
      <SelectContainer>
        <SelectLabel>Switch Theme</SelectLabel>
        <SelectTheme onChange={selectChange} value={selectedValue}>
          <ThemeOption value={LIGHT}>Light theme</ThemeOption>
          <ThemeOption value={COLORED}>Colored theme</ThemeOption>
          <ThemeOption value={DARK}>Dark theme</ThemeOption>
        </SelectTheme>
      </SelectContainer>
      <ClearButton>Clear all history</ClearButton>
    </PageWrapper>
  );
}

SettingsPage.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default SettingsPage;
