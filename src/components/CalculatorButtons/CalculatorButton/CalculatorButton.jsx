import PropTypes from 'prop-types';
import CButton from './components';

function CalculatorButton({ children }) {
  return <CButton>{children}</CButton>;
}

CalculatorButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CalculatorButton;
