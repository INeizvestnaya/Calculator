import React from 'react';
import {
  HorizontalDivider,
  MobileDevider
} from '@Components/HorizontalDivider';
import VerticalDevider from '@Components/VerticalDevider';
import { DisplayFunc, DisplayClass } from '@Containers/Display';
import { KeypadFunc, KeypadClass } from '@Containers/Keypad';
import { HistoryFunc, HistoryClass } from '@Containers/History';
import { CalculatorWrapper, FunctionalityWrapper } from './components';

function CalculatorFunc() {
  return (
    <CalculatorWrapper>
      <FunctionalityWrapper>
        <DisplayFunc />
        <HorizontalDivider />
        <KeypadFunc />
      </FunctionalityWrapper>
      <VerticalDevider />
      <MobileDevider />
      <HistoryFunc />
    </CalculatorWrapper>
  );
}

class CalculatorClass extends React.Component {
  render() {
    return (
      <CalculatorWrapper>
        <FunctionalityWrapper>
          <DisplayClass />
          <HorizontalDivider />
          <KeypadClass />
        </FunctionalityWrapper>
        <VerticalDevider />
        <MobileDevider />
        <HistoryClass />
      </CalculatorWrapper>
    );
  }
}

export { CalculatorFunc, CalculatorClass };
