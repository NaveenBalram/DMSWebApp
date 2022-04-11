import * as constants from '../constants/Auth';

export const authProviderRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.SIGN_IN_REQUEST,
});

export const authSuccess = (payload, meta) => ({
  meta,
  payload,
  type: constants.SIGN_IN_SUCCESS,
});




export const getCustomerServiceInfo = meta => ({
  meta,
  type: constants.GET_CUSTOMER_SERVICE_INFO,
});

export const getCustomerServiceInfoSuccess = payload => ({
  payload,
  type: constants.GET_CUSTOMER_SERVICE_INFO_SUCCESS,
});

export const getCustomerDetailRequest = (payload,meta) => ({
  meta,
  payload,
  type: constants.GET_CUSTOMER_DETAILS
});

export const getCustomerDetailSuccess = (payload) => ({
  payload,
  type: constants.CUSTOMER_DETAILS_SUCCESS
});

export const registerCustomerRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.REGISTER_CUSTOMER_REQUEST,
});

export const registerCustomerSuccess = payload => ({
  payload,
  type: constants.REGISTER_CUSTOMER_SUCCESS,
});


export const stopSendingEmailRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.STOP_EMAIL_REQUEST,
});

export const stopSendingEmailRequestSuccess = payload => ({
  payload,
  type: constants.STOP_EMAIL_REQEUST_SUCCESS,
});

export const accessCodeIncrement = payload =>({
  payload,
  type: constants.ACCESS_CODE_COUNT_INCREMENT
});

export const updateCustomerDetailsRequest = (payload, meta) =>({
  meta,
  payload,
  type:constants.UPDATE_REQUEST,
});             

export const updateCustomerDetailsSuccess = payload =>({
  payload,
  type:constants.UPDATE_REQUEST_SUCCESS,
});