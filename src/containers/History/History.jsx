import React from 'react';
import HistoryItem from '@Components/HistoryItem';
import { HistoryWrapper, HistoryLabel } from './components';

function HistoryFunc() {
  return (
    <HistoryWrapper>
      <HistoryLabel>History</HistoryLabel>
      <HistoryItem>1+1=2</HistoryItem>
      <HistoryItem>2+2=4</HistoryItem>
      <HistoryItem>3+3=6</HistoryItem>
      <HistoryItem>4+4=8</HistoryItem>
    </HistoryWrapper>
  );
}

class HistoryClass extends React.Component {
  render() {
    return (
      <HistoryWrapper>
        <HistoryLabel>History</HistoryLabel>
        <HistoryItem>1+1=2</HistoryItem>
      </HistoryWrapper>
    );
  }
}

export { HistoryFunc, HistoryClass };
