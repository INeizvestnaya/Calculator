import PropTypes from 'prop-types';
import { CButton } from './components';

const CalculatorButton = ({ children, onButtonClick, long }) => {
  const buttonClick = (event) => onButtonClick(event.target.innerHTML);

  return (
    <CButton onClick={buttonClick} data-text={children} long={long}>
      {children}
    </CButton>
  );
};

CalculatorButton.defaultProps = {
  long: false
};

CalculatorButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onButtonClick: PropTypes.func.isRequired,
  long: PropTypes.bool
};

export default CalculatorButton;
