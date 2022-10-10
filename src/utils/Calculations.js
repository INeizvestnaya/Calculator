import {
  LEFT_BRACKET,
  RIGHT_BRACKET,
  C_SIGN,
  CE_SIGN,
  DOT,
  PLUS_MINUS,
  EQUAL,
  ZERO,
  PLUS,
  MINUS
} from '@Constants/calculatorSigns';
import calculateExpression from './calculateExpression';
import { setLocalStorage, getLocalStorage } from './localStorageActions';

const resetCurrent = () => {
  const { curOperand, prevOperand } = getLocalStorage();

  if (curOperand !== '' && !prevOperand.length) {
    localStorage.setItem('curOperand', '');
  }

  if (curOperand !== '' && prevOperand.length) {
    const lastItem = prevOperand.pop();

    setLocalStorage(lastItem, prevOperand);
  }
};

const addDigit = (sign) => {
  const { curOperand, prevOperand, overwrite } = getLocalStorage();

  // only one zero
  if (sign === ZERO && curOperand === ZERO) {
    return;
  }
  // only one dot
  if (sign === DOT && curOperand.includes(DOT)) {
    return;
  }
  // zero is added before a dot
  if (sign === DOT && curOperand === '') {
    localStorage.setItem('curOperand', `0${sign}`);
    return;
  }
  // if operation was executed and we need to rewrite
  if (overwrite) {
    setLocalStorage(sign === DOT ? `0${sign}` : sign, undefined, false);
    return;
  }
  // if operation was typed we need to push it to current history
  if (curOperand !== '' && !/\d/.test(curOperand)) {
    prevOperand.push(curOperand);

    setLocalStorage(sign === DOT ? `0${sign}` : sign, prevOperand);
    return;
  }

  localStorage.setItem('curOperand', `${curOperand || ''}${sign}`);
};

const chooseOperation = (sign) => {
  const { curOperand, prevOperand } = getLocalStorage();

  // if something was typed we need to push it to current history
  if (
    curOperand !== '' &&
    (/\d/.test(curOperand) ||
      curOperand === LEFT_BRACKET ||
      curOperand === RIGHT_BRACKET)
  ) {
    prevOperand.push(curOperand);

    setLocalStorage(sign, prevOperand, false);
    return;
  }
  // if operation was typed we rewrite it
  if (curOperand !== '' && !/\d/.test(curOperand)) {
    localStorage.setItem('curOperand', sign);
    return;
  }
  // if nothing was typed
  if (curOperand === '' && prevOperand !== '') {
    localStorage.setItem('curOperand', sign);
  }
};

const addBracket = (sign) => {
  const { curOperand, prevOperand } = getLocalStorage();

  if (curOperand !== '') {
    prevOperand.push(curOperand);
  }

  setLocalStorage(sign, prevOperand);
};

const changeSign = () => {
  const { curOperand, prevOperand } = getLocalStorage();

  if (curOperand === PLUS) {
    localStorage.setItem('curOperand', MINUS);
    return;
  }

  if (curOperand === MINUS) {
    localStorage.setItem('curOperand', PLUS);
    return;
  }

  if (/\d/.test(curOperand)) {
    const lastTyped = prevOperand[prevOperand.length - 1];
    prevOperand.pop();

    if (lastTyped === PLUS) {
      prevOperand.push(MINUS);
      localStorage.setItem('prevOperand', prevOperand);
      return;
    }

    if (lastTyped === MINUS) {
      prevOperand.push(PLUS);
      localStorage.setItem('prevOperand', prevOperand);
      return;
    }

    if (curOperand[0] === MINUS) {
      localStorage.setItem('curOperand', curOperand.slice(1));
      return;
    }

    localStorage.setItem('curOperand', `-${curOperand}`);
  }
};

const execute = () => {
  const { curOperand, prevOperand, history } = getLocalStorage();

  if (
    !prevOperand.length ||
    (curOperand === '' && prevOperand[prevOperand.length - 1] !== RIGHT_BRACKET)
  ) {
    return;
  }

  const res = calculateExpression(curOperand, prevOperand);

  if (!Number.isFinite(res)) {
    throw new Error('Error in calculations');
  }

  const histItem = `${prevOperand.join('')}${curOperand}=${res}`;
  history.unshift(histItem);

  setLocalStorage(`${res}`, [], true, history);
};

const handleSignType = (sign) => {
  try {
    if (sign === C_SIGN) {
      setLocalStorage('', [], false);
    } else if (sign === CE_SIGN) {
      resetCurrent();
    } else if (sign === DOT || /\d/.test(sign)) {
      addDigit(sign);
    } else if (sign === LEFT_BRACKET || sign === RIGHT_BRACKET) {
      addBracket(sign);
    } else if (sign === PLUS_MINUS) {
      changeSign();
    } else if (sign === EQUAL) {
      execute();
    } else {
      chooseOperation(sign);
    }

    return false;
  } catch (err) {
    return true;
  }
};

export default handleSignType;
