import React from 'react';
import { propTypes } from './propsData';
import { ShowHideButton } from './components';

const ControlPanelFunc = ({ handleShowHistory, showHistory }) => {
  const handleClick = () => {
    handleShowHistory();
  };

  return (
    <ShowHideButton onClick={handleClick} data-show-hide>
      {showHistory ? 'Hide' : 'Show'}
    </ShowHideButton>
  );
};

ControlPanelFunc.propTypes = propTypes;

export default React.memo(ControlPanelFunc);
