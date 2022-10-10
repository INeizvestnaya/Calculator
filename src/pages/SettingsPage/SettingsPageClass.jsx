import React from 'react';
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

class SettingsPageClass extends React.Component {
  constructor(props) {
    super(props);

    this.selectChange = this.selectChange.bind(this);
    this.handleClearHistory = this.handleClearHistory.bind(this);
  }

  handleClearHistory() {
    const { clearHistory } = this.props;
    clearHistory();
  }

  selectChange(event) {
    const { changeTheme } = this.context;
    changeTheme(event.target.value);
  }

  render() {
    const { theme } = this.context;

    return (
      <>
        <SettingsLabel>Settings class</SettingsLabel>
        <SelectContainer>
          <SelectLabel>Switch Theme</SelectLabel>
          <SelectTheme onChange={this.selectChange} value={theme.type}>
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
        <ClearButton onClick={this.handleClearHistory} data-clear-hist>
          Clear all history
        </ClearButton>
      </>
    );
  }
}

SettingsPageClass.propTypes = propTypes;
SettingsPageClass.contextType = ThemeContext;

export default Layout(SettingsPageClass);
