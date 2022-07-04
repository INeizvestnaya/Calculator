import React from 'react';
import {
  DisplayWrapper,
  CurrentExpression,
  CurrentHistory
} from './components';

function DisplayFunc() {
  return (
    <DisplayWrapper>
      <CurrentHistory>5+5=10</CurrentHistory>
      <CurrentExpression>10-</CurrentExpression>
    </DisplayWrapper>
  );
}

class DisplayClass extends React.Component {
  render() {
    return (
      <DisplayWrapper>
        <CurrentHistory>5+5=10</CurrentHistory>
        <CurrentExpression>10-</CurrentExpression>
      </DisplayWrapper>
    );
  }
}

export { DisplayFunc, DisplayClass };
