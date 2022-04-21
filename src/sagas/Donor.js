import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,putRequest,deleteRequest } from '../api/APICalls';
import {getAllDonorsSuccess,saveDonorKindSuccess,getDonorByIdSuccess,updateDonorKindSuccess,
        saveDonorSuccess,updateDonorSuccess, deleteDonorKindSuccess,deleteDonorSuccess, getMasterDataSuccess,
        saveStakeHolderSuccess,UpdateStakeHolderSuccess,deleteStakeHolderSuccess
      } from '../actions/Donors';
import * as constants from '../constants/Donors';
import {saveProposalFamilyUnitSuccess,getProposalByDonorIdSuccess,updateProposalFamilyUnitSuccess,deleteProposalByIdSuccess,
  saveProposalSuccess,getProposalsByDonorIdSuccess,updateProposalSuccess,deleteProposalsByIdSuccess,getBudgetProposalByProposalIdSuccess
} from '../actions/Proposal';
import { take } from 'lodash';
import { updateSyncErrors } from 'redux-form';

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

//PROPOSAL FAMILY UNIT

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
    yield put(deleteProposalsByIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

//NON Family Unit 

function* saveProposalsSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'Proposal/addNonfus', payload);
    yield put(saveProposalSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getProposalsByIdSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Proposal/getNonfusByDonorId?donorId='+payload.donorId);
    yield put(getProposalsByDonorIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateProposalsSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(putRequest, 'Proposal/updateNonfusById', payload);
    yield put(updateProposalSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


function* deleteProposalsSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'Proposal/deleteNonfusById',payload);
    yield put(deleteProposalsByIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getBudgetProposalByIdSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Proposal/getNonfusById?proposalId='+payload.proposalId);
    yield put(getBudgetProposalByProposalIdSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getMasterDataInfoSaga({meta:{resolve,reject}}){
  try{
    const res = yield call(getRequest, 'MasterData/all');
    yield put(getMasterDataSuccess(res));
    yield call(resolve);
  }catch(error){
    yield call(reject,error)
  }
}

//StakeHolders 

function* saveStakeHolderSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'StakeHolder/add', payload);
    yield put(saveStakeHolderSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateStakeHolderSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(putRequest, 'StakeHolder/update', payload);
    yield put(UpdateStakeHolderSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


function* deleteStakeHolderSaga({ payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'StakeHolder/delete',payload);
    yield put(deleteStakeHolderSuccess(res));
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
  //FAMILY Unit PROPOSAL
  yield takeLatest(constants.SAVE_PROPOSAL_FAMILY_UNIT_REQUEST,saveProposalFamilyUnitSaga);
  yield takeLatest(constants.GET_PROPOSAL_REQUEST,getProposalFamilyUnitByIdSaga);
  yield takeLatest(constants.UPDATE_PROPOSAL_FAMILY_UNIT_REQUEST,updateProposalFamilyUnitSaga);
  yield takeLatest(constants.DELETE_PROPOSAL_FAMILY_UNIT_REQUEST,deleteProposalFammilyUnitSaga);
  //NON FAMILY UNIT PROPOSAL
  yield takeLatest(constants.SAVE_PROPOSALS_REQUEST,saveProposalsSaga);
  yield takeLatest(constants.GET_PROPOSALS_REQUEST,getProposalsByIdSaga);
  yield takeLatest(constants.UPDATE_PROPOSALS_REQUEST,updateProposalsSaga);
  yield takeLatest(constants.DELETE_PROPOSALS_REQUEST,deleteProposalsSaga);
  yield takeLatest(constants.GET_PROPOSALS_BY_PROPOSALID_REQUEST,getBudgetProposalByIdSaga);

  yield takeLatest(constants.GET_ALL_MASTER_DATA_INFO_REQUEST,getMasterDataInfoSaga);

  //STAKE HOLDER
  yield takeLatest(constants.SAVE_STAKE_HOLDER_REQUEST,saveStakeHolderSaga);
  yield takeLatest(constants.UPDATE_STAKE_HOLDER_REQUEST,updateStakeHolderSaga);
  yield takeLatest(constants.DELETE_STAKE_HOLDER_REQUEST,deleteStakeHolderSaga);

}
