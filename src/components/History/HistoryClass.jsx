import React from 'react';
import { v4 as uuid } from 'uuid';
import { propTypes } from './propsData';
import {
  HistoryWrapper,
  HistoryLabel,
  HistoryItem,
  ItemsWrapper
} from './components';

class HistoryClass extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
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
  }
}

HistoryClass.propTypes = propTypes;

export default HistoryClass;
