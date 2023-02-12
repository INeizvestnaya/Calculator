const add = (x, y) => +x + +y;
const sub = (x, y) => +x - +y;
const mul = (x, y) => +x * +y;
const div = (x, y) => +x / +y;
const rem = (x, y) => +x % +y;

function Command(execute, value) {
  this.execute = execute;
  this.value = value;
}

function AddCommand(value) {
  return new Command(add, value);
}

function SubCommand(value) {
  return new Command(sub, value);
}

function MulCommand(value) {
  return new Command(mul, value);
}

function DivCommand(value) {
  return new Command(div, value);
}

function RemCommand(value) {
  return new Command(rem, value);
}

function Calculator() {
  let cur = 0;

  return {
    execute(command) {
      cur = command.execute(cur, command.value);
    },
    getCurrent() {
      return cur;
    },
    setCurrent(val) {
      cur = val;
    }
  };
}

export default Calculator;

export { AddCommand, SubCommand, MulCommand, DivCommand, RemCommand };
