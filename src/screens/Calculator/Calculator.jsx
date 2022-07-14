import React, { useState } from 'react';
import {
  HorizontalDivider,
  MobileDevider
} from '@Components/HorizontalDivider';
import VerticalDevider from '@Components/VerticalDevider';
import { DisplayFunc, DisplayClass } from '@Containers/Display';
import { KeypadFunc, KeypadClass } from '@Containers/Keypad';
import { HistoryFunc, HistoryClass } from '@Containers/History';
import { ControlPanelFunc, ControlPanelClass } from '@Containers/ControlPanel';
import { CalculatorWrapper, FunctionalityWrapper } from './components';

function CalculatorFunc() {
  const [showHistory, setShowHistory] = useState(true);

  const handleShowHistory = () => {
    setShowHistory((prevState) => !prevState);
  };

  return (
    <CalculatorWrapper>
      <FunctionalityWrapper showHistory={showHistory}>
        <DisplayFunc />
        <HorizontalDivider />
        <KeypadFunc />
      </FunctionalityWrapper>
      <ControlPanelFunc
        handleShowHistory={handleShowHistory}
        showHistory={showHistory}
      />
      {showHistory && (
        <>
          <VerticalDevider />
          <MobileDevider />
          <HistoryFunc />
        </>
      )}
    </CalculatorWrapper>
  );
}

class CalculatorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    };
    this.handleShowHistory = this.handleShowHistory.bind(this);
  }

  handleShowHistory() {
    this.setState((state) => ({ showHistory: !state.showHistory }));
  }

  render() {
    const { showHistory } = this.state;

    return (
      <CalculatorWrapper>
        <FunctionalityWrapper showHistory={showHistory}>
          <DisplayClass />
          <HorizontalDivider />
          <KeypadClass />
        </FunctionalityWrapper>
        <ControlPanelClass
          handleShowHistory={this.handleShowHistory}
          showHistory={showHistory}
        />
        {showHistory && (
          <>
            <VerticalDevider />
            <MobileDevider />
            <HistoryClass />
          </>
        )}
      </CalculatorWrapper>
    );
  }
}

export { CalculatorFunc, CalculatorClass };
