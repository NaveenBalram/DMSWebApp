import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest } from '../api/APICalls';
import {
  authSuccess,
  getCustomerServiceInfoSuccess,
  getCustomerDetailSuccess,
  updateCustomerDetailsSuccess,
} from '../actions/Auth';
import * as constants from '../constants/Auth';

function* authProvider({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Customer/SignIn', payload);
    yield put(authSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getCustomerServiceInfo({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Generic/GetMasterDataInfo');
    yield put(getCustomerServiceInfoSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getCustomerDetails({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Customer/GetCustomerDetails', payload);
    yield put(getCustomerDetailSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* registerCustomer({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'Customer/RegisterCustomer', payload);
    yield put(authSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* UpdateCustomer({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'Customer/UpdateCustomer', payload);
    yield put(updateCustomerDetailsSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


// function* getBrokerinfo({payload, meta: {resolve, reject}}) {
//   try {
//     const res = yield call (getRequest, 'Agent/GetBrokerDetails', payload);
//     yield put (brokerInfoRequestSuccess (res));
//     yield call (resolve);
//   } catch (error) {
//     yield call (reject, error);
//   }
// }

// function* stopSendingEmailSaga({payload, meta: {resolve, reject}}) {
//   try {
//     const res = yield call (
//       postRequest,
//       'Agent/AssignCustomerToCompletePurchase',
//       payload
//     );
//     yield put (stopSendingEmailRequestSuccess (res));
//     yield call (resolve);
//   } catch (error) {
//     yield call (reject, error);
//   }
// }

export default function* sagas() {
  yield takeLatest(constants.SIGN_IN_REQUEST, authProvider);
  yield takeLatest(constants.GET_CUSTOMER_SERVICE_INFO, getCustomerServiceInfo);
  yield takeLatest(constants.GET_CUSTOMER_DETAILS, getCustomerDetails);
  yield takeLatest(constants.REGISTER_CUSTOMER_REQUEST, registerCustomer);
  yield takeLatest(constants.UPDATE_REQUEST,UpdateCustomer);
  // yield takeLatest (constants.BROKER_INFO_REQUEST, getBrokerinfo);
  // yield takeLatest (constants.STOP_EMAIL_REQUEST, stopSendingEmailSaga);
}
