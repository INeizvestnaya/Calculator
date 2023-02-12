import PropTypes from 'prop-types';
import { Divider } from './components';

Divider.defaultProps = {
  vertical: false,
  mobile: false
};

Divider.propTypes = {
  vertical: PropTypes.bool,
  mobile: PropTypes.bool
};

export default Divider;
