import * as constants from '../constants/Donors';


//Reducers
export const saveStakeHolderReducer =(payload)=>({
    payload,
    type: constants.SAVE_DONORS_STAKE_HOLDERS
  });




  //API's
  
  export const getAllDonorsRequest = (meta) => ({
    meta,
    type: constants.GET_ALL_DONORS_REQUEST
  });
  
export const getAllDonorsSuccess = (payload) => ({
    payload,
    type: constants.GET_ALL_DONORS_SUCCESS
  });

  export const saveDonorKindRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.SAVE_DONOR_KIND_REQUEST
  });

  export const saveDonorKindSuccess = (payload)=>({
    payload,
    type:constants.SAVE_DONOR_KIND_SUCCESS
  });

  export const saveDonorRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.SAVE_DONOR_REQUEST
  });

  export const saveDonorSuccess = (payload)=>({
    payload,
    type:constants.SAVE_DONOR_SUCCESS
  });

  export const updateDonorRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.UPDATE_DONOR_REQUEST
  });

  export const updateDonorSuccess = (payload)=>({
    payload,
    type:constants.UPDATE_DONOR_SUCCESS
  });


  export const updateDonorKindRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.UPDATE_DONOR_KIND_REQUEST
  });

  export const updateDonorKindSuccess = (payload)=>({
    payload,
    type:constants.UPDATE_DONOR_KIND_SUCCESS
  });

  export const getDonorByIdRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.GET_DONOR_BY_ID_REQUEST
  });

  export const getDonorByIdSuccess = (payload)=>({
    payload,
    type:constants.GET_DONOR_BY_ID_SUCCESS
  });

  export const deleteDonorKindRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.DELETE_DONOR_KIND_REQUEST
  });

  export const deleteDonorKindSuccess = (payload)=>({
    payload,
    type:constants.DELETE_DONOR_KIND_REQUEST
  });

  
  export const deleteDonorRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.DELETE_DONOR_REQUEST
  });

  export const deleteDonorSuccess = (payload)=>({
    payload,
    type:constants.DELETE_DONOR_SUCCESS
  });

  export const getMasterDataRequest =(meta)=>({
    meta,
    type:constants.GET_ALL_MASTER_DATA_INFO_REQUEST
  });

  export const getMasterDataSuccess = (payload) =>({
    payload,
    type:constants.GET_ALL_MASTER_DATA_INFO_SUCCESS
  });

  
//StakeHolder

export const deleteStakeHolderSuccess = (payload)=>({
  payload,
  type:constants.DELETE_STAKE_HOLDER_SUCCESS
});

export const deleteStakeHolderRequest =(payload,meta)=>({
  meta,
  payload,
  type:constants.DELETE_STAKE_HOLDER_REQUEST
});

export const saveStakeHolderSuccess = (payload)=>({
  payload,
  type:constants.SAVE_STAKE_HOLDER_SUCCESS
});

export const saveStakeHolderRequest =(payload,meta)=>({
  meta,
  payload,
  type:constants.SAVE_STAKE_HOLDER_REQUEST
});

export const UpdateStakeHolderRequest =(payload,meta)=>({
  meta,
  payload,
  type:constants.UPDATE_STAKE_HOLDER_REQUEST
});

export const UpdateStakeHolderSuccess =(payload)=>({
  payload,
  type:constants.UPDATE_STAKE_HOLDER_SUCCESS
});


