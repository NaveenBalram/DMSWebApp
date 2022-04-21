import * as constants from '../constants/Donors';

export const saveProposalFamilyUnitRequest = (payload,meta)=>({
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


  export const saveProposalRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.SAVE_PROPOSALS_REQUEST
  });

  export const saveProposalSuccess = (payload)=>({
    payload,
    type:constants.SAVE_PROPOSALS_SUCCESS
  });

  export const updateProposalRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.UPDATE_PROPOSALS_REQUEST
  });

  export const updateProposalSuccess = (payload)=>({
    payload,
    type:constants.UPDATE_PROPOSALS_SUCCESS
  });

  export const getProposalsByDonorIdRequest =(payload,meta)=>({
    meta,
    payload,
    type:constants.GET_PROPOSALS_REQUEST
  });

  export const getProposalsByDonorIdSuccess = (payload)=>({
    payload,
    type:constants.GET_PROPOSALS_SUCCESS
  });


  export const deleteProposalsByIdRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.DELETE_PROPOSALS_REQUEST
  });

  export const deleteProposalsByIdSuccess = (payload)=>({
    payload,
    type:constants.DELETE_PROPOSALS_SUCCESS
  });

  export const getBudgetProposalByProposalIdRequest = (payload,meta)=>({
    meta,
    payload,
    type:constants.GET_PROPOSALS_BY_PROPOSALID_REQUEST
  });

  export const getBudgetProposalByProposalIdSuccess = (payload)=>({
    payload,
    type:constants.GET_PROPOSALS_BY_PROPOSALID_SUCCESS
  });