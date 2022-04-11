import * as constants from '../constants/Header';

export const setHighContrast = () => ({
  type: constants.SET_HIGH_CONTRAST,
});

export const setUserName = ({ payload }) => ({
  payload,
  type: constants.SET_USER_NAME,
});

export const setAuthStatus = ({ payload }) => ({
  payload,
  type: constants.SET_AUTH_STATUS,
});

export const setCartCount = payload => ({
  payload,
  type: constants.SET_CART_COUNT,
});

export const clearCart = () => ({
  type: constants.CLEAR_CART,
});

export const savedonorStatusReducer =(payload)=>({
  payload,
  type: constants.SAVE_DONORS_STATUS
});
