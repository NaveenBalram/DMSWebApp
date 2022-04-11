import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,putRequest,deleteRequest } from '../api/APICalls';
import {getAllDonorsSuccess,saveDonorKindSuccess,getDonorByIdSuccess,updateDonorKindSuccess,
        saveDonorSuccess,updateDonorSuccess, deleteDonorKindSuccess,deleteDonorSuccess} from '../actions/Donors';
import * as constants from '../constants/Donors';
import {saveProposalFamilyUnitSuccess,getProposalByDonorIdSuccess,updateProposalFamilyUnitSuccess,deleteProposalByIdSuccess} from '../actions/Proposal';
import { take } from 'lodash';

function* getAllDonorsSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Donor/allDonors');
    yield put(getAllDonorsSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* saveDonorKindSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'KindDonor/add', payload);
    yield put(saveDonorKindSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* saveDonorSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'Donor/add', payload);
    yield put(saveDonorSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateDonorSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(putRequest, 'Donor/update', payload);
    yield put(updateDonorSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateDonorKindSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(putRequest, 'KindDonor/update', payload);
    yield put(updateDonorKindSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getDonorByIdSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Donor/getDonorById?id='+payload.id+'&donorTypeId='+payload.donorTypeId);
    yield put(getDonorByIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* deleteDonorKindSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'KindDonor/delete', payload);
    yield put(deleteDonorKindSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* deleteDonorSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'Donor/delete',payload);
    yield put(deleteDonorSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* saveProposalFamilyUnitSaga({ payload, meta: { resolve, reject } }) {

  try {
    const res = yield call(postRequest, 'Proposal/addfus', payload);
    yield put(saveProposalFamilyUnitSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getProposalFamilyUnitByIdSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Proposal/getfusByDonorId?donorId='+payload.donorId);
    yield put(getProposalByDonorIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateProposalFamilyUnitSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(putRequest, 'Proposal/updatefusById', payload);
    yield put(updateProposalFamilyUnitSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


function* deleteProposalFammilyUnitSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'Proposal/deletefusById',payload);
    yield put(deleteProposalByIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_ALL_DONORS_REQUEST, getAllDonorsSaga);
  yield takeLatest(constants.SAVE_DONOR_KIND_REQUEST,saveDonorKindSaga);
  yield takeLatest(constants.SAVE_DONOR_REQUEST,saveDonorSaga);
  yield takeLatest(constants.GET_DONOR_BY_ID_REQUEST,getDonorByIdSaga);
  yield takeLatest(constants.UPDATE_DONOR_KIND_REQUEST,updateDonorKindSaga);
  yield takeLatest(constants.UPDATE_DONOR_REQUEST,updateDonorSaga);
  yield takeLatest(constants.DELETE_DONOR_KIND_REQUEST,deleteDonorKindSaga);
  yield takeLatest(constants.DELETE_DONOR_REQUEST,deleteDonorSaga);
  yield takeLatest(constants.SAVE_PROPOSAL_FAMILY_UNIT_REQUEST,saveProposalFamilyUnitSaga);
  yield takeLatest(constants.GET_PROPOSAL_REQUEST,getProposalFamilyUnitByIdSaga);
  yield takeLatest(constants.UPDATE_PROPOSAL_FAMILY_UNIT_REQUEST,updateProposalFamilyUnitSaga);
  yield takeLatest(constants.DELETE_PROPOSAL_FAMILY_UNIT_REQUEST,deleteProposalFammilyUnitSaga);
}
