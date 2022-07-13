import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  C_ACTION,
  CE_ACTION,
  EXECUTE,
  CHANGE_SIGN,
  CLEAR_ALL_HISTORY
} from '@Constants/calculator-actions';
import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  ZERO,
  DOT
} from '@Constants/calculator-signs';
import Calculator, {
  AddCommand,
  SubCommand,
  MulCommand,
  DivCommand,
  RemCommand
} from './Command';

const emptyState = {
  curOperand: '',
  prevOperand: '',
  operation: '',
  overwrite: false,
  history: []
};

const CalculatorContext = React.createContext({
  dispatch: () => {},
  history: [],
  curOperand: '',
  prevOperand: '',
  operation: '',
  overwrite: false
});

const calculator = Calculator();

function reducer(state, { type, payload }) {
  const round = (num) => Math.round(num * 1000) / 1000;

  function exec() {
    switch (state.operation) {
      case PLUS:
        calculator.execute(new AddCommand(state.curOperand));
        break;
      case MINUS:
        calculator.execute(new SubCommand(state.curOperand));
        break;
      case MULTIPLY:
        calculator.execute(new MulCommand(state.curOperand));
        break;
      case DIVIDE:
        calculator.execute(new DivCommand(state.curOperand));
        break;
      case REMAINDER:
        calculator.execute(new RemCommand(state.curOperand));
        break;
      default:
        break;
    }
    const histItem = `${state.prevOperand} ${state.operation} ${
      state.curOperand
    } = ${round(calculator.getCurrent())}`;
    const newHist = [...state.history];
    newHist.unshift(histItem);
    return newHist;
  }

  switch (type) {
    case ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          curOperand:
            payload.digit === DOT ? `0${payload.digit}` : payload.digit
        };
      }
      if (payload.digit === ZERO && state.curOperand === ZERO) {
        return state;
      }
      if (payload.digit === DOT && state.curOperand.includes(DOT)) {
        return state;
      }
      if (payload.digit === DOT && state.curOperand === '') {
        return {
          ...state,
          curOperand: `0${payload.digit}`
        };
      }
      return {
        ...state,
        curOperand: `${state.curOperand || ''}${payload.digit}`
      };
    case CHOOSE_OPERATION: {
      if (state.prevOperand === '' && state.curOperand === '') {
        return { ...state, operation: '' };
      }
      if (
        state.prevOperand === '' &&
        state.curOperand !== '' &&
        !state.operation
      ) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.curOperand,
          curOperand: ''
        };
      }
      if (
        state.curOperand === '' &&
        state.prevOperand !== '' &&
        state.operation
      ) {
        return {
          ...state,
          operation: payload.operation
        };
      }
      if (
        state.curOperand !== '' &&
        state.prevOperand !== '' &&
        state.operation
      ) {
        calculator.setCurrent(state.prevOperand);
        const newHist = exec();
        return {
          ...state,
          operation: payload.operation,
          curOperand: '',
          prevOperand: `${round(calculator.getCurrent())}`,
          history: newHist
        };
      }
      break;
    }
    case C_ACTION:
      return {
        ...state,
        overwrite: false,
        curOperand: '',
        prevOperand: '',
        operation: ''
      };
    case CE_ACTION:
      if (state.curOperand) {
        return {
          ...state,
          curOperand: ''
        };
      }
      if (state.curOperand === '' && state.operation) {
        return {
          ...state,
          operation: '',
          curOperand: state.prevOperand,
          prevOperand: ''
        };
      }
      return state;
    case EXECUTE: {
      if (
        state.prevOperand === '' ||
        state.curOperand === '' ||
        !state.operation
      ) {
        return state;
      }

      calculator.setCurrent(state.prevOperand);
      const newHist = exec();
      return {
        ...state,
        prevOperand: '',
        operation: '',
        overwrite: true,
        curOperand: `${round(calculator.getCurrent())}`,
        history: newHist
      };
    }
    case CHANGE_SIGN:
      if (state.curOperand !== '') {
        return {
          ...state,
          curOperand:
            +state.curOperand >= 0
              ? `-${state.curOperand}`
              : state.curOperand.slice(1)
        };
      }
      if (state.curOperand === '') {
        if (state.operation === PLUS) {
          return {
            ...state,
            operation: MINUS
          };
        }
        if (state.operation === MINUS) {
          return {
            ...state,
            operation: PLUS
          };
        }
      }
      return state;
    case CLEAR_ALL_HISTORY:
      return emptyState;
    default:
      return state;
  }
  return state;
}

function CalculatorContextProvider({ children }) {
  const [{ curOperand, prevOperand, operation, history }, dispatch] =
    useReducer(reducer, emptyState);

  const memoizedContextValue = useMemo(
    () => ({
      dispatch,
      history,
      curOperand,
      prevOperand,
      operation
    }),
    [dispatch, history, curOperand, prevOperand, operation]
  );

  return (
    <CalculatorContext.Provider value={memoizedContextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

CalculatorContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { CalculatorContext, CalculatorContextProvider };
