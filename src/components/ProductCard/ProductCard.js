/* eslint-disable global-require */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ProductCard.module.scss';
import { PRODUCT_ICON_MAP } from '../../constants/LandingPage';
import { convertHTMLStringToString } from '../../utilities/helpers';

export const ProductCard = ({ product, handleSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const productIcon = PRODUCT_ICON_MAP.find(
    (mappedIcon) => product.id === mappedIcon.id
  ).icon;

  const toggleDisplay = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? styles.expandedContainer : styles.container}>
      <div className={styles.productInformationContainer}>
        <img
          alt="product logo"
          className={styles.productLogo}
          src={require(`../../assets/productLogos/${productIcon}`)}
        />
        <div className={styles.productName}>{product.name}</div>
        <div
          className={cn(
            styles.knowMore,
            isExpanded ? styles.gone : styles.visible
          )}
          onClick={toggleDisplay}
          onKeyPress={toggleDisplay}
          role="button"
          tabIndex={0}
        >
          Show Brief Description
        </div>
        <div
          className={cn(
            styles.productDetails,
            isExpanded ? styles.visible : styles.gone
          )}
        >
          {convertHTMLStringToString(product.longDescription)}
        </div>
        <div
          className={cn(
            styles.knowMore,
            isExpanded ? styles.visible : styles.gone
          )}
          onClick={toggleDisplay}
          onKeyPress={toggleDisplay}
          role="button"
          tabIndex={0}
        >
          Hide Description
        </div>
      </div>
      <div
        className={(
            styles.button
          )}
        onClick={() => handleSelect(product.productUrl)}
        onKeyPress={() => handleSelect(product.id)}
        role="button"
        tabIndex={0}
      >
        Learn More and get Pricing
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  product: PropTypes.shape({
    icon:PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    longDescription: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prodCategoryId: PropTypes.number.isRequired,
    productUrl: PropTypes.string.isRequired,
  }).isRequired,
};
