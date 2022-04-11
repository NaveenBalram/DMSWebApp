import * as constants from '../constants/LandingPage';

export const getProductsRequest =  meta => ({
  meta,
  type: constants.GET_PRODUCTS,
});

export const getProductsSuccess = (meta) => ({
  meta,
  type: constants.GET_PRODUCTS_SUCCESS,
});


