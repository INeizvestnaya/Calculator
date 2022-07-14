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
  prevOperand: '',
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

function parseExp(exp) {
  const parsed = [];
  let num = '';
  let lastSign = 0;

  for (let i = 0; i < exp.length; i += 1) {
    const cur = exp[i];
    if (/\d/.test(cur) || cur === DOT) {
      if (exp[i - 1] === MINUS && (!/\d/.test(exp[i - 2]) || i === 1)) {
        num += MINUS;
      }
      num += cur;
    } else {
      if (num.length) {
        parsed.push({ type: 'number', value: num });
      }

      if (cur === '(' || cur === ')') {
        parsed.push({ type: 'bracket', value: cur });
      } else if (cur === '+') {
        parsed.push({ type: 'sign', value: cur, priority: 1 });
      } else if (cur === MINUS && /\d/.test(exp[i - 1])) {
        parsed.push({ type: 'sign', value: cur, priority: 1 });
      } else if (cur === '*' || cur === '\\') {
        parsed.push({ type: 'sign', value: cur, priority: 2 });
      } else if (cur === '%') {
        parsed.push({ type: 'sign', value: cur, priority: 3 });
      }

      num = '';
      lastSign = i;
    }
  }
  if (!/\d/.test(exp[lastSign - 1])) {
    lastSign -= 1;
  }
  const lastEl = exp.slice(lastSign + 1);
  if (lastEl) {
    parsed.push({ type: 'number', value: exp.slice(lastSign + 1) });
  }

  return parsed;
}

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
      if (!/\d/.test(state.curOperand)) {
        return {
          ...state,
          prevOperand: `${state.prevOperand}${state.curOperand}`,
          curOperand: `${
            payload.digit === DOT ? `0${payload.digit}` : payload.digit
          }`
        };
      }
      return {
        ...state,
        curOperand: `${state.curOperand || ''}${payload.digit}`
      };
    case ADD_BRACKET:
      return {
        ...state,
        prevOperand: `${state.prevOperand}${
          state.overwrite ? '' : state.curOperand
        }${payload.digit}`,
        curOperand: ''
      };
    case CHOOSE_OPERATION: {
      // if number was typed we need to push it to current history
      if (state.curOperand !== '' && /\d/.test(state.curOperand)) {
        return {
          ...state,
          overwrite: false,
          prevOperand: `${state.prevOperand}${state.curOperand}`,
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
        prevOperand: ''
      };
    case CE_ACTION:
      // if there was an expression with brackets dont't do anythig
      if (state.prevOperand[state.prevOperand.length - 1] === RIGHT_BRACKET) {
        return { ...state, curOperand: '' };
      }
      // in usual case put previous typed thing to the input
      if (state.curOperand !== '' && state.prevOperand !== '') {
        let lastTypedIndex = 0;
        if (/\d/.test(state.prevOperand[state.prevOperand.length - 1])) {
          for (let i = state.prevOperand.length - 1; i >= 0; i += 1) {
            if (
              !/\d/.test(state.prevOperand[i]) &&
              !(state.prevOperand[i] === DOT)
            ) {
              lastTypedIndex = i + 1;
              break;
            }
          }
        } else {
          lastTypedIndex = state.prevOperand.length - 1;
        }

        return {
          ...state,
          curOperand: state.prevOperand.slice(lastTypedIndex),
          prevOperand: state.prevOperand.slice(0, lastTypedIndex)
        };
      }
      if (state.curOperand !== '' && state.prevOperand === '') {
        return { ...state, curOperand: '' };
      }
      return state;
    case EXECUTE: {
      if (
        state.prevOperand === '' ||
        (state.curOperand === '' &&
          state.prevOperand[state.prevOperand.length - 1] !== RIGHT_BRACKET)
      ) {
        return state;
      }

      const parsedExp = parseExp(state.prevOperand + state.curOperand);
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
      const histItem = `${state.prevOperand}${state.curOperand}=${res}`;
      const newHist = [...state.history];
      newHist.unshift(histItem);

      return {
        ...state,
        overwrite: true,
        curOperand: `${res}`,
        prevOperand: '',
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
        if (lastTyped === PLUS) {
          return {
            ...state,
            prevOperand: `${state.prevOperand.slice(0, -1)}-`
          };
        }
        if (lastTyped === MINUS) {
          return {
            ...state,
            prevOperand: `${state.prevOperand.slice(0, -1)}+`
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
