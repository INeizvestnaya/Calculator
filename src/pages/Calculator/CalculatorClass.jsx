import React from 'react';
import Divider from '@Components/Divider';
import { DisplayClass } from '@Components/Display';
import { KeypadClass } from '@Components/Keypad';
import { HistoryClass } from '@Components/History';
import { ControlPanelClass } from '@Components/ControlPanel';
import Layout from '@Components/Layout';
import { CalculatorWrapper, FunctionalityWrapper } from './components';
import { propTypes, defaultProps } from './propsData';

class CalculatorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    };

    this.handleShowHistory = this.handleShowHistory.bind(this);
    this.typeSign = this.typeSign.bind(this);
  }

  handleShowHistory() {
    this.setState((state) => ({ showHistory: !state.showHistory }));
  }

  typeSign(sign) {
    const { typeSign } = this.props;

    typeSign(sign);
  }

  render() {
    const { showHistory } = this.state;
    const { displayData, historyData } = this.props;

    return (
      <CalculatorWrapper data-calc-class>
        <FunctionalityWrapper showHistory={showHistory}>
          <DisplayClass displayData={displayData} />
          <Divider />
          <KeypadClass typeSign={this.typeSign} />
        </FunctionalityWrapper>
        <ControlPanelClass
          handleShowHistory={this.handleShowHistory}
          showHistory={showHistory}
        />
        {showHistory && (
          <>
            <Divider vertical />
            <Divider mobile />
            <HistoryClass history={historyData} />
          </>
        )}
      </CalculatorWrapper>
    );
  }
}

CalculatorClass.defaultProps = defaultProps;

CalculatorClass.propTypes = propTypes;

export default Layout(CalculatorClass);
