import Calculator, {
  AddCommand,
  SubCommand,
  MulCommand,
  DivCommand,
  RemCommand
} from '@Utils/Command';
import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  LEFT_BRACKET,
  RIGHT_BRACKET
} from '@Constants/calculator-signs';

const calculator = Calculator();

function calculateExpression(curOperand, prevOperand) {
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

  const newOperand = [...prevOperand];
  if (curOperand !== '') {
    newOperand.push(curOperand);
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
  return Math.round(val * 1000) / 1000;
}

export default calculateExpression;
