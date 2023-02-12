import React from 'react';
import { propTypes } from './propsData';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

class DisplayClass extends React.Component {
  render() {
    const { displayData } = this.props;

    return (
      <DisplayWrapper>
        <CurrentHistory data-type="cur-hist">
          {displayData.prevOperand.join('')}
        </CurrentHistory>
        <CurrentExpression data-type="cur-exp">
          {displayData.curOperand}
        </CurrentExpression>
      </DisplayWrapper>
    );
  }
}

DisplayClass.propTypes = propTypes;

export default DisplayClass;
