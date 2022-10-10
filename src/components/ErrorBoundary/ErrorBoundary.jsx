import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundaryMessage } from './components';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;

    return isError ? (
      <ErrorBoundaryMessage>
        Error in calculations! Plaese, reload the page
      </ErrorBoundaryMessage>
    ) : (
      children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
