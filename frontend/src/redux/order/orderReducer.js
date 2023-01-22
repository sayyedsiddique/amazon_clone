import {
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from "./orderType";

const initialOrderState = {
  orderState: [],
  orderDetails: {},
  loading: false,
  success: false,
  error: "",
};

export const orderCreateReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        orderState: action.payload,
      };
    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };
    case GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderCreateReducer;
