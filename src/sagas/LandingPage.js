import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../api/APICalls';
import { getProductsSuccess, } from '../actions/LandingPage';
import * as constants from '../constants/LandingPage';



function* getProductsRequestSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Product/GetAllProducts');
    yield put(getProductsSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_PRODUCTS, getProductsRequestSaga);
}
