import React from 'react';
import PropTypes from 'prop-types';
import { CalculatorFunc } from '@Screens/Calculator';

class FuncErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isError: false };
    this.handleResetError = this.handleResetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  handleResetError() {
    this.setState({ isError: false });
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;

    return isError ? (
      <CalculatorFunc isError handleResetError={this.handleResetError} />
    ) : (
      children
    );
  }
}

FuncErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default FuncErrorBoundary;
