import PropTypes from 'prop-types';
import LongCButton from './components';

function ButtonLong({ children, onButtonClick }) {
  const buttonClick = (event) => onButtonClick(event.target.innerHTML);

  return <LongCButton onClick={buttonClick}>{children}</LongCButton>;
}

ButtonLong.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default ButtonLong;
