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
} from '@Constants/calculatorSigns';

const keypad = [
  [PLUS_MINUS, DOT, C_SIGN, CE_SIGN],
  [7, 4, 1, LEFT_BRACKET],
  [8, 5, 2, ZERO],
  [9, 6, 3, RIGHT_BRACKET],
  [MULTIPLY, MINUS, PLUS],
  [DIVIDE, REMAINDER, EQUAL]
];

export default keypad;
