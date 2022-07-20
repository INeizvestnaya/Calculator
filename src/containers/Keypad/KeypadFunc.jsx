import { useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import CalculatorButton from '@Components/CalculatorButtons/CalculatorButton';
import ButtonLong from '@Components/CalculatorButtons/ButtonLong';
import keypad from '@Constants/keypad';
import ButtonsColumn from '@Components/ButtonsColumn';
import {
  PLUS,
  MINUS,
  EQUAL,
  DOT,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  PLUS_MINUS,
  CE_SIGN,
  C_SIGN,
  ZERO
} from '@Constants/calculator-signs';
import {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  C_ACTION,
  CE_ACTION,
  EXECUTE,
  CHANGE_SIGN,
  ADD_BRACKET
} from '@Constants/calculator-actions';
import calculateExpression from '@Utils/Calculations';
import KeypadFuncContainer from './components';

function KeypadFunc({ isError, resetError }) {
  const ctx = useContext(CalculatorContext);

  function reducer(state, { type, payload }) {
    const { curOperand, prevOperand, overwrite } = state;
    switch (type) {
      case ADD_DIGIT:
        // only one zero
        if (payload.digit === ZERO && curOperand === ZERO) {
          return state;
        }
        // only one dot
        if (payload.digit === DOT && curOperand.includes(DOT)) {
          return state;
        }
        // zero is added before a dot
        if (payload.digit === DOT && curOperand === '') {
          return {
            ...state,
            curOperand: `0${payload.digit}`
          };
        }
        // if operation was executed and we need to rewrite
        if (overwrite) {
          return {
            ...state,
            overwrite: false,
            curOperand:
              payload.digit === DOT ? `0${payload.digit}` : payload.digit
          };
        }
        // if operation was typed we need to push it to current history
        if (curOperand !== '' && !/\d/.test(curOperand)) {
          const newOperand = [...prevOperand];
          newOperand.push(curOperand);
          return {
            ...state,
            prevOperand: newOperand,
            curOperand: `${
              payload.digit === DOT ? `0${payload.digit}` : payload.digit
            }`
          };
        }
        return {
          ...state,
          curOperand: `${curOperand || ''}${payload.digit}`
        };
      case ADD_BRACKET: {
        const newOperand = [...prevOperand];
        if (curOperand !== '') {
          newOperand.push(curOperand);
        }
        return {
          ...state,
          prevOperand: newOperand,
          curOperand: payload.digit
        };
      }
      case CHOOSE_OPERATION: {
        // if something was typed we need to push it to current history
        if (
          curOperand !== '' &&
          (/\d/.test(curOperand) ||
            curOperand === LEFT_BRACKET ||
            curOperand === RIGHT_BRACKET)
        ) {
          const newOperand = [...prevOperand];
          newOperand.push(curOperand);
          return {
            ...state,
            overwrite: false,
            prevOperand: newOperand,
            curOperand: payload.operation
          };
        }
        // if operation was typed we rewrite it
        if (curOperand !== '' && !/\d/.test(curOperand)) {
          return { ...state, curOperand: payload.operation };
        }
        // if nothing was typed
        if (curOperand === '' && prevOperand !== '') {
          return { ...state, curOperand: payload.operation };
        }
        return state;
      }
      case C_ACTION:
        return {
          ...state,
          overwrite: false,
          curOperand: '',
          prevOperand: []
        };
      case CE_ACTION:
        // just delete current operand if previous is empty
        if (curOperand !== '' && !prevOperand.length) {
          return { ...state, curOperand: '' };
        }
        if (curOperand !== '' && prevOperand.length) {
          const newOperand = [...prevOperand];
          const lastItem = newOperand.pop();

          return {
            ...state,
            curOperand: lastItem,
            prevOperand: newOperand
          };
        }
        return state;
      case EXECUTE: {
        if (
          !prevOperand.length ||
          (curOperand === '' &&
            prevOperand[prevOperand.length - 1] !== RIGHT_BRACKET)
        ) {
          return state;
        }

        const res = calculateExpression(curOperand, prevOperand);
        const histItem = `${prevOperand.join('')}${curOperand}=${res}`;

        return {
          ...state,
          overwrite: true,
          curOperand: `${res}`,
          prevOperand: [],
          histItem
        };
      }
      case CHANGE_SIGN:
        if (curOperand === PLUS) {
          return { ...state, curOperand: MINUS };
        }
        if (curOperand === MINUS) {
          return { ...state, curOperand: PLUS };
        }
        if (/\d/.test(curOperand)) {
          const lastTyped = prevOperand[prevOperand.length - 1];
          const newOperand = [...prevOperand];
          newOperand.pop();
          if (lastTyped === PLUS) {
            newOperand.push(MINUS);
            return {
              ...state,
              prevOperand: newOperand
            };
          }
          if (lastTyped === MINUS) {
            newOperand.push(PLUS);
            return {
              ...state,
              prevOperand: newOperand
            };
          }
          if (curOperand[0] === MINUS) {
            return { ...state, curOperand: curOperand.slice(1) };
          }
          return { ...state, curOperand: `-${curOperand}` };
        }
        return state;
      default:
        return state;
    }
  }

  const [{ histItem, curOperand, prevOperand }, dispatch] = useReducer(
    reducer,
    {
      curOperand: '',
      prevOperand: [],
      overwrite: false,
      histItem: ''
    }
  );

  const buttonClickHandler = (sign) => {
    if (sign === C_SIGN) {
      dispatch({ type: C_ACTION });
    } else if (sign === CE_SIGN) {
      dispatch({ type: CE_ACTION });
    } else if (sign === DOT || /\d/.test(sign)) {
      dispatch({ type: ADD_DIGIT, payload: { digit: sign } });
    } else if (sign === LEFT_BRACKET || sign === RIGHT_BRACKET) {
      dispatch({ type: ADD_BRACKET, payload: { digit: sign } });
    } else if (sign === PLUS_MINUS) {
      dispatch({ type: CHANGE_SIGN });
    } else if (sign === EQUAL) {
      dispatch({ type: EXECUTE });
    } else {
      dispatch({ type: CHOOSE_OPERATION, payload: { operation: sign } });
    }

    if (isError) {
      resetError();
    }
  };

  useEffect(() => {
    ctx.addHistoryItem(histItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histItem]);
  useEffect(() => {
    ctx.changeCurOperand(curOperand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curOperand]);
  useEffect(() => {
    ctx.changePrevOperand(prevOperand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevOperand]);

  return (
    <KeypadFuncContainer>
      {keypad.map((column) => {
        if (column.length === 4) {
          return (
            <ButtonsColumn key={column[0]}>
              {column.map((button) => (
                <CalculatorButton
                  key={button}
                  onButtonClick={buttonClickHandler}
                >
                  {button}
                </CalculatorButton>
              ))}
            </ButtonsColumn>
          );
        }
        return (
          <ButtonsColumn key={column[0]}>
            <CalculatorButton onButtonClick={buttonClickHandler}>
              {column[0]}
            </CalculatorButton>
            <CalculatorButton onButtonClick={buttonClickHandler}>
              {column[1]}
            </CalculatorButton>
            <ButtonLong onButtonClick={buttonClickHandler}>
              {column[2]}
            </ButtonLong>
          </ButtonsColumn>
        );
      })}
    </KeypadFuncContainer>
  );
}

KeypadFunc.propTypes = {
  isError: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired
};

export default KeypadFunc;
