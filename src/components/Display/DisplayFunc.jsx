import { propTypes } from './propsData';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

const DisplayFunc = ({ displayData }) => {
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
};

DisplayFunc.propTypes = propTypes;

export default DisplayFunc;
