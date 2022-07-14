import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import {
  C_ACTION,
  CE_ACTION,
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CHANGE_SIGN,
  ADD_BRACKET
} from '@Constants/calculator-actions';
import {
  C_SIGN,
  CE_SIGN,
  DOT,
  PLUS_MINUS,
  LEFT_BRACKET,
  RIGHT_BRACKET
} from '@Constants/calculator-signs';
import CButton from './components';

function CalculatorButton({ children }) {
  const ctx = useContext(CalculatorContext);

  const buttonClick = (event) => {
    const sign = event.target.id;
    if (sign === C_SIGN) {
      ctx.dispatch({ type: C_ACTION });
    } else if (sign === CE_SIGN) {
      ctx.dispatch({ type: CE_ACTION });
    } else if (sign === DOT || /\d/.test(sign)) {
      ctx.dispatch({ type: ADD_DIGIT, payload: { digit: sign } });
    } else if (sign === LEFT_BRACKET || sign === RIGHT_BRACKET) {
      ctx.dispatch({ type: ADD_BRACKET, payload: { digit: sign } });
    } else if (sign === PLUS_MINUS) {
      ctx.dispatch({ type: CHANGE_SIGN });
    } else {
      ctx.dispatch({ type: CHOOSE_OPERATION, payload: { operation: sign } });
    }
  };

  return (
    <CButton onClick={buttonClick} id={children}>
      {children}
    </CButton>
  );
}

CalculatorButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CalculatorButton;
