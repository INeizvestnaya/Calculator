import React, { useContext } from 'react';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

function DisplayFunc() {
  const ctx = useContext(CalculatorContext);

  return (
    <DisplayWrapper>
      <CurrentHistory>{ctx.prevOperand}</CurrentHistory>
      <CurrentExpression>{ctx.curOperand}</CurrentExpression>
    </DisplayWrapper>
  );
}

class DisplayClass extends React.Component {
  render() {
    const { prevOperand, curOperand } = this.context;
    return (
      <DisplayWrapper>
        <CurrentHistory>{prevOperand}</CurrentHistory>
        <CurrentExpression>{curOperand}</CurrentExpression>
      </DisplayWrapper>
    );
  }
}
DisplayClass.contextType = CalculatorContext;

export { DisplayFunc, DisplayClass };
