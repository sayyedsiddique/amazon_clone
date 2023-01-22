import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./ProductTypes";

const initialProductState = {
  products: [],
  detailsProduct: {},
  loading: false,
  error: "",
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: "",
      };
    case PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        detailsProduct: action.payload,
        error: "",
      };
    case PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        detailsProduct: {},
        error: action.payload,
      };

    default:
      return state;
  }
};
