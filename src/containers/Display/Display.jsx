import React, { useContext } from 'react';
import { CalculatorContext } from '@Utils/CalculatorContext';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

function DisplayFunc() {
  const ctx = useContext(CalculatorContext);

  return (
    <DisplayWrapper>
      <CurrentHistory>{ctx.prevOperand + ctx.operation}</CurrentHistory>
      <CurrentExpression>{ctx.curOperand}</CurrentExpression>
    </DisplayWrapper>
  );
}

class DisplayClass extends React.Component {
  render() {
    const { prevOperand, operation, curOperand } = this.context;
    return (
      <DisplayWrapper>
        <CurrentHistory>{prevOperand + operation}</CurrentHistory>
        <CurrentExpression>{curOperand}</CurrentExpression>
      </DisplayWrapper>
    );
  }
}
DisplayClass.contextType = CalculatorContext;

export { DisplayFunc, DisplayClass };
