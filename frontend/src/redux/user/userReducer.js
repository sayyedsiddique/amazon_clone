import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SIGNOUT,
  USER_SIGNIN_SUCCESS,
} from "./userTypes";

const initialUserState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null ,
  loading: false,
  error: "",
};
export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: "",
      };
    case USER_SIGNIN_FAILURE:
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_SIGNIN_SIGNOUT:
      return {};

      case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: "",
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
