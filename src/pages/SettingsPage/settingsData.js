import PropTypes from 'prop-types';
import { LIGHT, DARK, COLORED } from '@Constants/themes';

export const propTypes = {
  clearHistory: PropTypes.func.isRequired
};

export const themeOptions = [
  { label: 'Light theme', value: LIGHT },
  { label: 'Colored theme', value: COLORED },
  { label: 'Dark theme', value: DARK }
];
