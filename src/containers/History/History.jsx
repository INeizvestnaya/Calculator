import React, { useContext } from 'react';
import { CalculatorContext } from '@Utils/CalculatorContext';
import HistoryItem from '@Components/HistoryItem';
import { HistoryWrapper, HistoryLabel, ItemsWrapper } from './components';

function HistoryFunc() {
  const ctx = useContext(CalculatorContext);

  return (
    <HistoryWrapper>
      <HistoryLabel>History</HistoryLabel>
      <ItemsWrapper>
        {ctx.history.map((exp) => (
          <HistoryItem key={exp}>{exp}</HistoryItem>
        ))}
      </ItemsWrapper>
    </HistoryWrapper>
  );
}

class HistoryClass extends React.Component {
  render() {
    const { history } = this.context;
    return (
      <HistoryWrapper>
        <HistoryLabel>History</HistoryLabel>
        {history.map((exp) => (
          <HistoryItem key={exp}>{exp}</HistoryItem>
        ))}
      </HistoryWrapper>
    );
  }
}
HistoryClass.contextType = CalculatorContext;

export { HistoryFunc, HistoryClass };
