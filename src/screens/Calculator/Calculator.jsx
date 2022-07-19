import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

function CalculatorFunc({ isError, handleResetError }) {
  const [showHistory, setShowHistory] = useState(true);

  const handleShowHistory = () => {
    setShowHistory((prevState) => !prevState);
  };

  const resetError = () => {
    handleResetError();
  };

  return (
    <CalculatorWrapper>
      <FunctionalityWrapper showHistory={showHistory}>
        <DisplayFunc isError={isError} />
        <HorizontalDivider />
        <KeypadFunc isError={isError} resetError={resetError} />
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

CalculatorFunc.defaultProps = {
  isError: false,
  handleResetError: () => {}
};

CalculatorFunc.propTypes = {
  isError: PropTypes.bool,
  handleResetError: PropTypes.func
};

class CalculatorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    };
    this.handleShowHistory = this.handleShowHistory.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  handleShowHistory() {
    this.setState((state) => ({ showHistory: !state.showHistory }));
  }

  resetError = () => {
    const { handleResetError } = this.props;
    handleResetError();
  };

  render() {
    const { showHistory } = this.state;
    const { isError } = this.props;

    return (
      <CalculatorWrapper>
        <FunctionalityWrapper showHistory={showHistory}>
          <DisplayClass isError={isError} />
          <HorizontalDivider />
          <KeypadClass isError={isError} resetError={this.resetError} />
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

CalculatorClass.defaultProps = {
  isError: false,
  handleResetError: () => {}
};

CalculatorClass.propTypes = {
  isError: PropTypes.bool,
  handleResetError: PropTypes.func
};

export { CalculatorFunc, CalculatorClass };
