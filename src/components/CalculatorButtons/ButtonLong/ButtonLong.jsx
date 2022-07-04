import PropTypes from 'prop-types';
import LongCButton from './components';

function ButtonLong({ children }) {
  return <LongCButton>{children}</LongCButton>;
}

ButtonLong.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ButtonLong;
