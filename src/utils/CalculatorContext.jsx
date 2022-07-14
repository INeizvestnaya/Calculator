import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  C_ACTION,
  CE_ACTION,
  EXECUTE,
  CHANGE_SIGN,
  CLEAR_ALL_HISTORY,
  ADD_BRACKET
} from '@Constants/calculator-actions';
import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  ZERO,
  DOT,
  LEFT_BRACKET,
  RIGHT_BRACKET
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
  prevOperand: [],
  overwrite: false,
  history: []
};

const CalculatorContext = React.createContext({
  dispatch: () => {},
  history: [],
  curOperand: '',
  prevOperand: [],
  operation: '',
  overwrite: false
});

const calculator = Calculator();

function reducer(state, { type, payload }) {
  switch (type) {
    case ADD_DIGIT:
      // only one zero
      if (payload.digit === ZERO && state.curOperand === ZERO) {
        return state;
      }
      // only one dot
      if (payload.digit === DOT && state.curOperand.includes(DOT)) {
        return state;
      }
      // zero is added before a dot
      if (payload.digit === DOT && state.curOperand === '') {
        return {
          ...state,
          curOperand: `0${payload.digit}`
        };
      }
      // if operation was executed and we need to rewrite
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          curOperand:
            payload.digit === DOT ? `0${payload.digit}` : payload.digit
        };
      }
      // if operation was typed we need to push it to current history
      if (state.curOperand !== '' && !/\d/.test(state.curOperand)) {
        const newOperand = [...state.prevOperand];
        newOperand.push(state.curOperand);
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
        curOperand: `${state.curOperand || ''}${payload.digit}`
      };
    case ADD_BRACKET: {
      const newOperand = [...state.prevOperand];
      if (state.curOperand !== '') {
        newOperand.push(state.curOperand);
      }
      newOperand.push(payload.digit);
      return {
        ...state,
        prevOperand: newOperand,
        curOperand: ''
      };
    }
    case CHOOSE_OPERATION: {
      // if number was typed we need to push it to current history
      if (state.curOperand !== '' && /\d/.test(state.curOperand)) {
        const newOperand = [...state.prevOperand];
        newOperand.push(state.curOperand);
        return {
          ...state,
          overwrite: false,
          prevOperand: newOperand,
          curOperand: payload.operation
        };
      }
      // if operation was typed we rewrite it
      if (state.curOperand !== '' && !/\d/.test(state.curOperand)) {
        return { ...state, curOperand: payload.operation };
      }
      // if nothing was typed
      if (state.curOperand === '' && state.prevOperand !== '') {
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
      if (state.curOperand !== '' && !state.prevOperand.length) {
        return { ...state, curOperand: '' };
      }
      if (state.curOperand !== '' && state.prevOperand.length) {
        const newOperand = [...state.prevOperand];
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
        !state.prevOperand.length ||
        (state.curOperand === '' &&
          state.prevOperand[state.prevOperand.length - 1] !== RIGHT_BRACKET)
      ) {
        return state;
      }

      const numStack = [];
      const signStack = [];

      const exec = () => {
        const rightValue = numStack.pop().value;
        calculator.setCurrent(numStack.pop().value);
        const operation = signStack.pop().value;
        switch (operation) {
          case PLUS:
            calculator.execute(new AddCommand(rightValue));
            break;
          case MINUS:
            calculator.execute(new SubCommand(rightValue));
            break;
          case MULTIPLY:
            calculator.execute(new MulCommand(rightValue));
            break;
          case DIVIDE:
            calculator.execute(new DivCommand(rightValue));
            break;
          case REMAINDER:
            calculator.execute(new RemCommand(rightValue));
            break;
          default:
            break;
        }
        numStack.push({ type: 'number', value: calculator.getCurrent() });
      };

      const newOperand = [...state.prevOperand];
      if (state.curOperand !== '') {
        newOperand.push(state.curOperand);
      }

      const parsedExp = newOperand.map((item) => {
        if (item === LEFT_BRACKET || item === RIGHT_BRACKET) {
          return { type: 'bracket', value: item };
        }
        if (/\d/.test(item)) {
          return { type: 'number', value: item };
        }
        if (item === MINUS || item === PLUS) {
          return { type: 'sign', value: item, priority: 1 };
        }
        if (item === MULTIPLY || item === DIVIDE) {
          return { type: 'sign', value: item, priority: 2 };
        }
        return { type: 'sign', value: item, priority: 3 };
      });

      parsedExp.forEach((item) => {
        if (item.type === 'number') {
          numStack.push(item);
        } else if (item.type === 'bracket') {
          if (item.value === LEFT_BRACKET) {
            signStack.push(item);
          } else {
            let lastItem = signStack[signStack.length - 1];
            while (lastItem.value !== LEFT_BRACKET) {
              exec();
              lastItem = signStack[signStack.length - 1];
            }
            signStack.pop();
          }
        } else if (!signStack.find((el) => el.type === 'sign')) {
          signStack.push(item);
        } else {
          let lastItem = signStack[signStack.length - 1];
          if (lastItem.type === 'sign' && lastItem.priority < item.priority) {
            signStack.push(item);
          } else if (lastItem.type === 'bracket') {
            signStack.push(item);
          } else {
            while (lastItem && item && lastItem.priority >= item.priority) {
              exec();
              lastItem = signStack[signStack.length - 1];
            }
            signStack.push(item);
          }
        }
      });
      while (signStack.length) {
        exec();
      }
      const val = numStack[0].value;
      const res = Math.round(val * 1000) / 1000;
      const histItem = `${state.prevOperand.join('')}${
        state.curOperand
      }=${res}`;
      const newHist = [...state.history];
      newHist.unshift(histItem);

      return {
        ...state,
        overwrite: true,
        curOperand: `${res}`,
        prevOperand: [],
        history: newHist
      };
    }
    case CHANGE_SIGN:
      if (state.curOperand === PLUS) {
        return { ...state, curOperand: MINUS };
      }
      if (state.curOperand === MINUS) {
        return { ...state, curOperand: PLUS };
      }
      if (/\d/.test(state.curOperand)) {
        const lastTyped = state.prevOperand[state.prevOperand.length - 1];
        const newOperand = [...state.prevOperand];
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
        if (state.curOperand[0] === MINUS) {
          return { ...state, curOperand: state.curOperand.slice(1) };
        }
        return { ...state, curOperand: `-${state.curOperand}` };
      }
      return state;
    case CLEAR_ALL_HISTORY:
      return emptyState;
    default:
      return state;
  }
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
