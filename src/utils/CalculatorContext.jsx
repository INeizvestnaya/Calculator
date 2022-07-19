import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const CalculatorContext = React.createContext({
  history: [],
  curOperand: '',
  prevOperand: [],
  addHistoryItem: () => {},
  changeCurOperand: () => {},
  changePrevOperand: () => {}
});

function CalculatorContextProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [curOperand, setCurOperand] = useState('');
  const [prevOperand, setPrevOperand] = useState([]);

  const addHistoryItem = (histItem) => {
    if (histItem) {
      setHistory((prevState) => {
        const newHist = [...prevState];
        newHist.unshift(histItem);
        return newHist;
      });
    }
  };

  const changeCurOperand = (newValue) => {
    setCurOperand(newValue);
  };

  const changePrevOperand = (newValue) => {
    setPrevOperand(newValue);
  };

  const memoizedContextValue = useMemo(
    () => ({
      history,
      curOperand,
      prevOperand,
      addHistoryItem,
      changeCurOperand,
      changePrevOperand
    }),
    [history, curOperand, prevOperand]
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
