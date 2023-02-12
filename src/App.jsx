import { useContext, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { EQUAL } from '@Constants/calculatorSigns';
import { CalculatorFunc, CalculatorClass } from '@Pages/Calculator';
import ErrorPage from '@Pages/ErrorPage';
import { SettingsPageFunc, SettingsPageClass } from '@Pages/SettingsPage';
import GlobalStyles from '@Utils/GlobalStyles';
import {
  CALCULATOR_FUNCTIONAL,
  CALCULATOR_CLASS,
  SETTINGS_FUNC,
  SETTINGS_CLASS
} from '@Constants/paths';
import { ThemeContext } from '@Utils/ThemeContext.jsx';
import handleSignType from '@Utils/calculations';
import { getLocalStorage, setLocalStorage } from '@Utils/localStorageActions';

const initialCalсData = getLocalStorage();

const resetOperation = () => setLocalStorage('', [], false);

function App() {
  const theme = useContext(ThemeContext);

  const [displayData, setDisplayData] = useState({
    curOperand: '',
    prevOperand: []
  });
  const [historyData, setHistoryData] = useState(initialCalсData.history || []);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    resetOperation();
  }, []);

  useEffect(() => {
    if (isError) {
      throw new Error('Error in calculations');
    }
  }, [isError]);

  const typeSign = useCallback((sign) => {
    const err = handleSignType(sign);
    if (err) {
      resetOperation();
      setIsError(true);
    }

    const { curOperand, prevOperand, history } = getLocalStorage();
    setDisplayData({ curOperand, prevOperand });
    if (sign === EQUAL) {
      setHistoryData(history);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setDisplayData({
      curOperand: '',
      prevOperand: []
    });
    setHistoryData([]);
    setLocalStorage('', [], false, []);
  }, []);

  return (
    <ThemeProvider theme={theme.theme.value}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={CALCULATOR_FUNCTIONAL} replace />}
        />
        <Route
          path={CALCULATOR_FUNCTIONAL}
          element={
            <CalculatorFunc
              typeSign={typeSign}
              displayData={displayData}
              historyData={historyData}
            />
          }
        />
        <Route
          path={CALCULATOR_CLASS}
          element={
            <CalculatorClass
              typeSign={typeSign}
              displayData={displayData}
              historyData={historyData}
            />
          }
        />
        <Route
          path={SETTINGS_FUNC}
          element={<SettingsPageFunc clearHistory={clearHistory} />}
        />
        <Route
          path={SETTINGS_CLASS}
          element={<SettingsPageClass clearHistory={clearHistory} />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
