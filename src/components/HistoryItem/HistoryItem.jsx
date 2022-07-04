import PropTypes from 'prop-types';
import ItemWrapper from './components';

function HistoryItem({ children }) {
  return <ItemWrapper>{children}</ItemWrapper>;
}

HistoryItem.propTypes = {
  children: PropTypes.string.isRequired
};

export default HistoryItem;
