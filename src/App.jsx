import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CalculatorFunc, CalculatorClass } from '@Screens/Calculator';
import ErrorPage from '@Screens/ErrorPage';
import SettingsPage from '@Screens/SettingsPage';
import Header from '@Containers/Header';
import GlobalStyles from '@Utils/GlobalStyles';
import { LIGHT, COLORED, DARK } from '@Constants/themes';
import themes from '@Utils/StyleTheme';

function App() {
  const [theme, setTheme] = useState({ type: LIGHT, value: themes.light });

  const changeTheme = (t) => {
    if (t === COLORED) {
      setTheme({ type: COLORED, value: themes.colored });
    } else if (t === DARK) {
      setTheme({ type: DARK, value: themes.dark });
    } else {
      setTheme({ type: LIGHT, value: themes.light });
    }
  };

  return (
    <ThemeProvider theme={theme.value}>
      <Header />
      <Routes>
        <Route path="/calculator-functional" element={<CalculatorFunc />} />
        <Route path="/calculator-class" element={<CalculatorClass />} />
        <Route
          path="/settings"
          element={
            <SettingsPage
              changeTheme={changeTheme}
              selectedValue={theme.type}
            />
          }
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
