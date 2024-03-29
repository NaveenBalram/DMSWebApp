import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import styles from './Spinner.module.scss';

const Spinner = ({ color, className }) => (
  <div className={cn(styles.spinnerContainer, className)}>
    <BarLoader color={color} />
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
  color: '#f4852e',
};

export default Spinner;
