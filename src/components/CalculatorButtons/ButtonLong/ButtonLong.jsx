import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CalculatorContext } from '@Utils/CalculatorContext';
import { CHOOSE_OPERATION, EXECUTE } from '@Constants/calculator-actions';
import { PLUS } from '@Constants/calculator-signs';
import LongCButton from './components';

function ButtonLong({ children }) {
  const ctx = useContext(CalculatorContext);

  const buttonClick = (event) => {
    const sign = event.target.id;
    if (sign === PLUS) {
      ctx.dispatch({ type: CHOOSE_OPERATION, payload: { operation: sign } });
    } else {
      ctx.dispatch({ type: EXECUTE });
    }
  };

  return (
    <LongCButton onClick={buttonClick} id={children}>
      {children}
    </LongCButton>
  );
}

ButtonLong.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ButtonLong;
