import * as constants from '../constants/Donors';

export const saveProposalFamilyUnitRequest = (payload,meta)=>( console.log(payload),{
    meta,
    payload,
    type:constants.SAVE_PROPOSAL_FAMILY_UNIT_REQUEST
  });

  export const saveProposalFamilyUnitSuccess = (payload)=>({
    payload,
    type:constants.SAVE_PROPOSAL_FAMILY_UNIT_SUCCESS
  });


  export const updateProposalFamilyUnitRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.UPDATE_PROPOSAL_FAMILY_UNIT_REQUEST
  });

  export const updateProposalFamilyUnitSuccess = (payload)=>({
    payload,
    type:constants.UPDATE_PROPOSAL_FAMILY_UNIT_SUCCESS
  });

  export const getProposalByDonorIdRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.GET_PROPOSAL_REQUEST
  });

  export const getProposalByDonorIdSuccess = (payload)=>({
    payload,
    type:constants.GET_PROPOSAL_SUCCESS
  });

  export const deleteProposalByIdRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.DELETE_PROPOSAL_FAMILY_UNIT_REQUEST
  });

  export const deleteProposalByIdSuccess = (payload)=>({
    payload,
    type:constants.DELETE_PROPOSAL_FAMILY_UNIT_SUCCESS
  });
