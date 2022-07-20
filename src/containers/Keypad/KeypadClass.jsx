import React from 'react';
import PropTypes from 'prop-types';
import CalculatorButton from '@Components/CalculatorButtons/CalculatorButton';
import ButtonLong from '@Components/CalculatorButtons/ButtonLong';
import ButtonsColumn from '@Components/ButtonsColumn';
import { CalculatorContext } from '@Utils/CalculatorContext.jsx';
import keypad from '@Constants/keypad';
import calculateExpression from '@Utils/Calculations';
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
import KeypadFuncContainer from './components';

class KeypadClass extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.state = {
      curTyped: { sign: '', change: 0 },
      curOperand: '',
      prevOperand: [],
      overwrite: false,
      histItem: ''
    };
  }

  componentDidMount() {
    const { isError } = this.props;
    const { prevOperand, changePrevOperand } = this.context;
    if (isError && prevOperand.length !== 0) {
      changePrevOperand([]);
    }
  }

  componentDidUpdate(_, prevState) {
    const { curOperand, prevOperand, histItem, curTyped, overwrite } =
      this.state;
    const { changeCurOperand, addHistoryItem, changePrevOperand } =
      this.context;

    if (prevState.curOperand !== curOperand) {
      changeCurOperand(curOperand);
    }
    if (prevState.histItem !== histItem) {
      addHistoryItem(histItem);
    }
    if (prevState.prevOperand.length !== prevOperand.length) {
      changePrevOperand(prevOperand);
    }
    if (
      prevOperand[prevOperand.length - 1] !==
      prevState.prevOperand[prevState.prevOperand.length - 1]
    ) {
      changePrevOperand(prevOperand);
    }

    if (prevState.curTyped.change !== curTyped.change) {
      const { sign } = curTyped;
      if (sign === C_SIGN) {
        this.setState({
          overwrite: false,
          curOperand: '',
          prevOperand: []
        });
      } else if (sign === CE_SIGN) {
        if (curOperand !== '' && !prevOperand.length) {
          this.setState({ curOperand: '' });
          return;
        }
        if (curOperand !== '' && prevOperand.length) {
          const newOperand = [...prevOperand];
          const lastItem = newOperand.pop();
          this.setState({
            curOperand: lastItem,
            prevOperand: newOperand
          });
        }
      } else if (sign === DOT || /\d/.test(sign)) {
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
          this.setState({
            curOperand: `0${sign}`
          });
          return;
        }
        // if operation was executed and we need to rewrite
        if (overwrite) {
          this.setState({
            overwrite: false,
            curOperand: sign === DOT ? `0${sign}` : sign
          });
          return;
        }
        // if operation was typed we need to push it to current history
        if (curOperand !== '' && !/\d/.test(curOperand)) {
          const newOperand = [...prevOperand];
          newOperand.push(curOperand);
          this.setState({
            prevOperand: newOperand,
            curOperand: `${sign === DOT ? `0${sign}` : sign}`
          });
          return;
        }
        this.setState({
          curOperand: `${curOperand || ''}${sign}`
        });
      } else if (sign === LEFT_BRACKET || sign === RIGHT_BRACKET) {
        const newOperand = [...prevOperand];
        if (curOperand !== '') {
          newOperand.push(curOperand);
        }

        this.setState({
          prevOperand: newOperand,
          curOperand: sign
        });
      } else if (sign === PLUS_MINUS) {
        if (curOperand === PLUS) {
          this.setState({ curOperand: MINUS });
          return;
        }
        if (curOperand === MINUS) {
          this.setState({ curOperand: PLUS });
          return;
        }
        if (/\d/.test(curOperand)) {
          const lastTyped = prevOperand[prevOperand.length - 1];
          const newOperand = [...prevOperand];
          newOperand.pop();
          if (lastTyped === PLUS) {
            newOperand.push(MINUS);
            this.setState({
              prevOperand: newOperand
            });
            return;
          }
          if (lastTyped === MINUS) {
            newOperand.push(PLUS);
            this.setState({
              prevOperand: newOperand
            });
            return;
          }
          if (curOperand[0] === MINUS) {
            this.setState({ curOperand: curOperand.slice(1) });
            return;
          }
          this.setState({ curOperand: `-${curOperand}` });
        }
      } else if (sign === EQUAL) {
        if (
          !prevOperand.length ||
          (curOperand === '' &&
            prevOperand[prevOperand.length - 1] !== RIGHT_BRACKET)
        ) {
          return;
        }

        const res = calculateExpression(curOperand, prevOperand);
        const newHistItem = `${prevOperand.join('')}${curOperand}=${res}`;

        this.setState({
          overwrite: true,
          curOperand: `${res}`,
          prevOperand: [],
          histItem: newHistItem
        });
      } else {
        // if number was typed we need to push it to current history
        if (
          curOperand !== '' &&
          (/\d/.test(curOperand) ||
            curOperand === LEFT_BRACKET ||
            curOperand === RIGHT_BRACKET)
        ) {
          const newOperand = [...prevOperand];
          newOperand.push(curOperand);
          this.setState({
            overwrite: false,
            prevOperand: newOperand,
            curOperand: sign
          });
          return;
        }
        // if operation was typed we rewrite it
        if (curOperand !== '' && !/\d/.test(curOperand)) {
          this.setState({ curOperand: sign });
          return;
        }
        // if nothing was typed
        if (curOperand === '' && prevOperand !== '') {
          this.setState({ curOperand: sign });
        }
      }
    }
  }

  buttonClickHandler(sign) {
    const { isError, resetError } = this.props;
    if (isError) {
      resetError();
    }

    this.setState({ curTyped: { sign, change: Math.random() } });
  }

  render() {
    return (
      <KeypadFuncContainer>
        {keypad.map((column) => {
          if (column.length === 4) {
            return (
              <ButtonsColumn key={column[0]}>
                {column.map((button) => (
                  <CalculatorButton
                    key={button}
                    onButtonClick={this.buttonClickHandler}
                  >
                    {button}
                  </CalculatorButton>
                ))}
              </ButtonsColumn>
            );
          }
          return (
            <ButtonsColumn key={column[0]}>
              <CalculatorButton onButtonClick={this.buttonClickHandler}>
                {column[0]}
              </CalculatorButton>
              <CalculatorButton onButtonClick={this.buttonClickHandler}>
                {column[1]}
              </CalculatorButton>
              <ButtonLong onButtonClick={this.buttonClickHandler}>
                {column[2]}
              </ButtonLong>
            </ButtonsColumn>
          );
        })}
      </KeypadFuncContainer>
    );
  }
}
KeypadClass.contextType = CalculatorContext;

KeypadClass.propTypes = {
  isError: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired
};

export default KeypadClass;
