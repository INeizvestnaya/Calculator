import { Routes, Route } from 'react-router-dom';
import { CalculatorFunc, CalculatorClass } from '@Screens/Calculator';
import ErrorPage from '@Screens/ErrorPage';
import SettingsPage from '@Screens/SettingsPage';
import Header from '@Containers/Header';
import GlobalStyles from '@Utils/GlobalStyles';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/calculator-functional" element={<CalculatorFunc />} />
        <Route path="/calculator-class" element={<CalculatorClass />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <GlobalStyles />
    </>
  );
}

export default App;
