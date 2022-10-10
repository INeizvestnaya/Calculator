import { useState, useCallback } from 'react';
import Divider from '@Components/Divider';
import { DisplayFunc } from '@Components/Display';
import { KeypadFunc } from '@Components/Keypad';
import { HistoryFunc } from '@Components/History';
import { ControlPanelFunc } from '@Components/ControlPanel';
import Layout from '@Components/Layout';
import { CalculatorWrapper, FunctionalityWrapper } from './components';
import { propTypes, defaultProps } from './propsData';

const CalculatorFunc = ({ typeSign, displayData, historyData }) => {
  const [showHistory, setShowHistory] = useState(true);

  const handleShowHistory = useCallback(() => {
    setShowHistory((prevState) => !prevState);
  }, []);

  const handleTypeSign = useCallback(
    (sign) => {
      typeSign(sign);
    },
    [typeSign]
  );

  return (
    <CalculatorWrapper data-calc-func>
      <FunctionalityWrapper showHistory={showHistory}>
        <DisplayFunc displayData={displayData} />
        <Divider />
        <KeypadFunc typeSign={handleTypeSign} />
      </FunctionalityWrapper>
      <ControlPanelFunc
        handleShowHistory={handleShowHistory}
        showHistory={showHistory}
      />
      {showHistory && (
        <>
          <Divider vertical />
          <Divider mobile />
          <HistoryFunc history={historyData} />
        </>
      )}
    </CalculatorWrapper>
  );
};

CalculatorFunc.defaultProps = defaultProps;

CalculatorFunc.propTypes = propTypes;

export default Layout(CalculatorFunc);
