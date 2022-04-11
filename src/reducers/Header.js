import * as constants from '../constants/Header';

const initialState = {
  cartActive: null,
  highContrast: false,
  isAuthenticated: false,
  userName: null,
  isHeaderRequired: true,
  isDonorCreated:true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_HIGH_CONTRAST: {
     
      return {
        ...state,
        highContrast: !state.highContrast,
      };
    }
    case constants.SET_AUTH_STATUS: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case constants.SAVE_DONORS_STATUS: {
      return {
        ...state,
        isDonorCreated: action.payload.isDonorCreated,
      }
    }
    case constants.SET_USER_NAME: {
      return {
        ...state,
        userName: action.payload.userName,
      };
    }
    case constants.SET_CART_COUNT: {
      return {
        ...state,
        cartActive: action.payload.count,
      };
    }

    case constants.CLEAR_CART: {
      return {
        ...state,
        cartActive: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
