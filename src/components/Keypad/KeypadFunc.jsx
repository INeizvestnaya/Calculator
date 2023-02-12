import React, { useCallback } from 'react';
import CalculatorButton from '@Components/CalculatorButton';
import keypad from '@Constants/keypad';
import { PLUS, EQUAL } from '@Constants/calculatorSigns';
import { KeypadContainer, ButtonsColumn } from './components';
import { propTypes } from './propsData';

const KeypadFunc = ({ typeSign }) => {
  const buttonClickHandler = useCallback(
    (sign) => {
      typeSign(sign);
    },
    [typeSign]
  );

  return (
    <KeypadContainer>
      {keypad.map((column) => (
        <ButtonsColumn key={column[0]}>
          {column.map((button) => (
            <CalculatorButton
              key={button}
              onButtonClick={buttonClickHandler}
              long={button === PLUS || button === EQUAL}
            >
              {button}
            </CalculatorButton>
          ))}
        </ButtonsColumn>
      ))}
    </KeypadContainer>
  );
};

KeypadFunc.propTypes = propTypes;

export default React.memo(KeypadFunc);
