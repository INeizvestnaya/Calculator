import {
  SettingsLabel,
  SelectTheme,
  ThemeOption,
  SelectLabel,
  SelectContainer,
  ClearButton
} from './components';

function SettingsPage() {
  return (
    <>
      <SettingsLabel>Settings</SettingsLabel>
      <SelectContainer>
        <SelectLabel>Switch Theme</SelectLabel>
        <SelectTheme>
          <ThemeOption value="light">Light theme</ThemeOption>
          <ThemeOption value="colored">Colored theme</ThemeOption>
          <ThemeOption value="dark">Dark theme</ThemeOption>
        </SelectTheme>
      </SelectContainer>
      <ClearButton>Clear all history</ClearButton>
    </>
  );
}

export default SettingsPage;
