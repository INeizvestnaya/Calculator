import React from 'react';
import PropTypes from 'prop-types';
import ShowHideButton from './components';

function ControlPanelFunc({ handleShowHistory, showHistory }) {
  const handleClick = () => {
    handleShowHistory();
  };

  return (
    <ShowHideButton onClick={handleClick}>
      {showHistory ? 'Hide' : 'Show'}
    </ShowHideButton>
  );
}

ControlPanelFunc.propTypes = {
  handleShowHistory: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired
};

class ControlPanelClass extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleShowHistory } = this.props;
    handleShowHistory();
  }

  render() {
    const { showHistory } = this.props;

    return (
      <ShowHideButton onClick={this.handleClick}>
        {showHistory ? 'Hide' : 'Show'}
      </ShowHideButton>
    );
  }
}

ControlPanelClass.propTypes = {
  handleShowHistory: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired
};

export { ControlPanelFunc, ControlPanelClass };
