import React from 'react';
import CalculatorButton from '@Components/CalculatorButtons/CalculatorButton';
import ButtonLong from '@Components/CalculatorButtons/ButtonLong';
import ButtonsColumn from '@Components/ButtonsColumn';
import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  EQUAL,
  DOT,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  PLUS_MINUS,
  CE_SIGN,
  C_SIGN,
  ZERO
} from '@Constants/calculator-signs';
import KeypadFuncContainer from './components';

const keypad = [
  [PLUS_MINUS, DOT, C_SIGN, CE_SIGN],
  [7, 4, 1, LEFT_BRACKET],
  [8, 5, 2, ZERO],
  [9, 6, 3, RIGHT_BRACKET],
  [MULTIPLY, MINUS, PLUS],
  [DIVIDE, REMAINDER, EQUAL]
];

function KeypadFunc() {
  return (
    <KeypadFuncContainer>
      {keypad.map((column) => {
        if (column.length === 4) {
          return (
            <ButtonsColumn key={column[0]}>
              {column.map((button) => (
                <CalculatorButton key={button}>{button}</CalculatorButton>
              ))}
            </ButtonsColumn>
          );
        }
        return (
          <ButtonsColumn key={column[0]}>
            <CalculatorButton>{column[0]}</CalculatorButton>
            <CalculatorButton>{column[1]}</CalculatorButton>
            <ButtonLong>{column[2]}</ButtonLong>
          </ButtonsColumn>
        );
      })}
    </KeypadFuncContainer>
  );
}

class KeypadClass extends React.Component {
  render() {
    return (
      <KeypadFuncContainer>
        {keypad.map((column) => {
          if (column.length === 4) {
            return (
              <ButtonsColumn key={column[0]}>
                {column.map((button) => (
                  <CalculatorButton key={button}>{button}</CalculatorButton>
                ))}
              </ButtonsColumn>
            );
          }
          return (
            <ButtonsColumn key={column[0]}>
              <CalculatorButton>{column[0]}</CalculatorButton>
              <CalculatorButton>{column[1]}</CalculatorButton>
              <ButtonLong>{column[2]}</ButtonLong>
            </ButtonsColumn>
          );
        })}
      </KeypadFuncContainer>
    );
  }
}

export { KeypadFunc, KeypadClass };
