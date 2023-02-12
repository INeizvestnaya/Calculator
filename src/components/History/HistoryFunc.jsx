import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  HistoryWrapper,
  HistoryLabel,
  HistoryItem,
  ItemsWrapper
} from './components';
import { propTypes } from './propsData';

const HistoryFunc = ({ history }) => (
  <HistoryWrapper data-hist-wrapper>
    <HistoryLabel>History</HistoryLabel>
    <ItemsWrapper>
      {history.map((exp) => (
        <HistoryItem key={uuid()} data-hist-item={exp}>
          {exp}
        </HistoryItem>
      ))}
    </ItemsWrapper>
  </HistoryWrapper>
);

HistoryFunc.propTypes = propTypes;

export default React.memo(HistoryFunc);
