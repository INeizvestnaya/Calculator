import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

function DisplayFunc({ isError }) {
  const ctx = useContext(CalculatorContext);

  return (
    <DisplayWrapper>
      <CurrentHistory data-type="cur-hist">
        {ctx.prevOperand.join('')}
      </CurrentHistory>
      <CurrentExpression data-type="cur-exp">
        {isError ? 'Error' : ctx.curOperand}
      </CurrentExpression>
    </DisplayWrapper>
  );
}

DisplayFunc.propTypes = {
  isError: PropTypes.bool.isRequired
};

class DisplayClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { prevOperand, curOperand } = this.context;
    const { isError } = this.props;

    return (
      <DisplayWrapper>
        <CurrentHistory data-type="cur-hist">
          {prevOperand.join('')}
        </CurrentHistory>
        <CurrentExpression data-type="cur-exp">
          {isError ? 'Error' : curOperand}
        </CurrentExpression>
      </DisplayWrapper>
    );
  }
}
DisplayClass.contextType = CalculatorContext;

export { DisplayFunc, DisplayClass };
