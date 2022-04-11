import * as constants from '../constants/Auth';

const initialState = {
  customerInfo: [],
  getBrokerInfo: [],
  signUpInitialData: [],
  accessCodeCounter: 0, 
  userLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGN_IN_SUCCESS: {
      return {
        ...state,
        customerInfo: action.payload.data,
      };
    }

    case constants.GET_CUSTOMER_SERVICE_INFO_SUCCESS: {
      return {
        ...state,
        signUpInitialData: action.payload.data,
      };
    }
    case constants.CUSTOMER_DETAILS_SUCCESS: {
      return {
        ...state,
        customerInfo: action.payload.data,
      };
    }
    case constants.BROKER_INFO_REQUEST_SUCCESS: {
      return {
        ...state,
        customerInfo: action.payload.data.CustomerInfo,
        getBrokerInfo: action.payload.data,
      };
    }
    case constants.ACCESS_CODE_COUNT_INCREMENT:{
      return{
        ...state,
        accessCodeCounter: action.payload.accessCodeCounter,
      };
    }
    case constants.UPDATE_REQUEST_SUCCESS:{
      return{
        ...state,
        customerInfo: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
