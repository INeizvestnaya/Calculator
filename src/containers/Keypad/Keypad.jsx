import React from 'react';
import CalculatorButton from '@Components/CalculatorButtons/CalculatorButton';
import ButtonLong from '@Components/CalculatorButtons/ButtonLong';
import ButtonsColumn from '@Components/ButtonsColumn';
import KeypadFuncContainer from './components';

const keypad = [
  ['+/-', '.', 'C', 'CE'],
  [7, 4, 1, '('],
  [8, 5, 2, 0],
  [9, 6, 3, ')'],
  ['*', '-', '+'],
  ['\\', '%', '=']
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
