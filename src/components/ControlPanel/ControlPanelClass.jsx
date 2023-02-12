import React from 'react';
import { propTypes } from './propsData';
import { ShowHideButton } from './components';

class ControlPanelClass extends React.PureComponent {
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
      <ShowHideButton onClick={this.handleClick} data-show-hide>
        {showHistory ? 'Hide' : 'Show'}
      </ShowHideButton>
    );
  }
}

ControlPanelClass.propTypes = propTypes;

export default ControlPanelClass;
