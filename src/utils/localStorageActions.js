export const setLocalStorage = (
  curOperand,
  prevOperand,
  overwrite,
  history
) => {
  if (curOperand !== undefined) {
    localStorage.setItem('curOperand', curOperand);
  }

  if (prevOperand !== undefined) {
    localStorage.setItem('prevOperand', prevOperand);
  }

  if (overwrite !== undefined) {
    localStorage.setItem('overwrite', overwrite);
  }

  if (history !== undefined) {
    localStorage.setItem('history', history);
  }
};

export const getLocalStorage = () => {
  let prevOperand = localStorage.getItem('prevOperand');
  if (prevOperand) {
    prevOperand = prevOperand.split(',').filter((item) => item !== '');
  } else {
    prevOperand = [];
  }

  let history = localStorage.getItem('history');
  if (history) {
    history = history.split(',').filter((item) => item !== '');
  } else {
    history = [];
  }

  return {
    curOperand: localStorage.getItem('curOperand'),
    prevOperand,
    overwrite: JSON.parse(localStorage.getItem('overwrite')),
    history
  };
};
