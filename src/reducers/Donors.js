import * as constants from '../constants/Donors';

const initialState = {
  donorStakeHolders: [],
  donorsInformation: [],
  donorInfo: {},
  donorProposalLists: [],
  donorFinanceProposalists: [],
  budgetProposalInfo: {},
  masterDataLists: []
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    //Reducers
    case constants.SAVE_DONORS_STAKE_HOLDERS: {
      return {
        ...state,
        donorStakeHolders: action.payload,
      }
    }

    //API's
    case constants.GET_ALL_DONORS_SUCCESS: {
      return {
        ...state,
        donorsInformation: action.payload,
      }
    }
    case constants.GET_DONOR_BY_ID_SUCCESS: {
      return {
        ...state,
        donorInfo: action.payload,
      }
    }
    case constants.GET_PROPOSAL_SUCCESS: {
      return {
        ...state,
        donorProposalLists: action.payload,
      }
    }
    case constants.GET_PROPOSALS_SUCCESS: {
      return {
        ...state,
        donorFinanceProposalists: action.payload,
      }
    }
    case constants.GET_PROPOSALS_BY_PROPOSALID_SUCCESS: {
      return {
        ...state,
        budgetProposalInfo: action.payload,
      }
    }
    case constants.GET_ALL_MASTER_DATA_INFO_SUCCESS: {
      return {
        ...state,
        masterDataLists: action.payload.data.systemConfiguration,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
