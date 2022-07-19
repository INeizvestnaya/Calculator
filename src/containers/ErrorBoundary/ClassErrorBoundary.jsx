import React from 'react';
import PropTypes from 'prop-types';
import { CalculatorClass } from '@Screens/Calculator';

class ClassErrorBoundary extends React.Component {
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
      <CalculatorClass isError handleResetError={this.handleResetError} />
    ) : (
      children
    );
  }
}

ClassErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ClassErrorBoundary;
