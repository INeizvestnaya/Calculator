import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CalculatorFunc, CalculatorClass } from '@Screens/Calculator';
import ErrorPage from '@Screens/ErrorPage';
import SettingsPage from '@Screens/SettingsPage';
import Header from '@Containers/Header';
import GlobalStyles from '@Utils/GlobalStyles';
import { LIGHT, COLORED, DARK } from '@Constants/themes';
import themes from '@Utils/StyleTheme';
import { CalculatorContextProvider } from '@Utils/CalculatorContext.jsx';
import {
  ClassErrorBoundary,
  FuncErrorBoundary
} from '@Containers/ErrorBoundary';

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
    <CalculatorContextProvider>
      <ThemeProvider theme={theme.value}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/calculator-functional" replace />}
          />
          <Route
            path="/calculator-functional"
            element={
              <FuncErrorBoundary>
                <CalculatorFunc />
              </FuncErrorBoundary>
            }
          />
          <Route
            path="/calculator-class"
            element={
              <ClassErrorBoundary>
                <CalculatorClass />
              </ClassErrorBoundary>
            }
          />
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
    </CalculatorContextProvider>
  );
}

export default App;