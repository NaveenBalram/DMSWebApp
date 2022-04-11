import * as constants from '../constants/LandingPage';

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.meta.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
