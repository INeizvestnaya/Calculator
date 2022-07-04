import PropTypes from 'prop-types';
import ColumnWrapper from './components';

function ButtonsColumn({ children }) {
  return <ColumnWrapper>{children}</ColumnWrapper>;
}

ButtonsColumn.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ButtonsColumn;
