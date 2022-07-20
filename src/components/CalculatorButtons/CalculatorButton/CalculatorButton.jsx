import PropTypes from 'prop-types';
import CButton from './components';

function CalculatorButton({ children, onButtonClick }) {
  const buttonClick = (event) => onButtonClick(event.target.innerHTML);

  return (
    <CButton onClick={buttonClick} data-text={children}>
      {children}
    </CButton>
  );
}

CalculatorButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default CalculatorButton;
