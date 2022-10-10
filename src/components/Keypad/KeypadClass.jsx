import React from 'react';
import CalculatorButton from '@Components/CalculatorButton';
import keypad from '@Constants/keypad';
import { PLUS, EQUAL } from '@Constants/calculatorSigns';
import { KeypadContainer, ButtonsColumn } from './components';
import { propTypes } from './propsData';

class KeypadClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  buttonClickHandler(sign) {
    const { typeSign } = this.props;

    typeSign(sign);
  }

  render() {
    return (
      <KeypadContainer>
        {keypad.map((column) => (
          <ButtonsColumn key={column[0]}>
            {column.map((button) => (
              <CalculatorButton
                key={button}
                onButtonClick={this.buttonClickHandler}
                long={button === PLUS || button === EQUAL}
              >
                {button}
              </CalculatorButton>
            ))}
          </ButtonsColumn>
        ))}
      </KeypadContainer>
    );
  }
}

KeypadClass.propTypes = propTypes;

export default KeypadClass;
