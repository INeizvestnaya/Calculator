import PropTypes from 'prop-types';

export const defaultProps = {
  isError: false,
  handleResetError: () => {}
};

export const propTypes = {
  typeSign: PropTypes.func.isRequired,
  displayData: PropTypes.object.isRequired,
  historyData: PropTypes.array.isRequired
};
