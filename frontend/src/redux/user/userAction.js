import axios from "axios";
import { apiConfig } from "../../utils/constantFunction";
import { USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "./userTypes";

export const signinRequest = () => {
  return {
    type: USER_SIGNIN_REQUEST,
  };
};

export const signinSuccess = (data) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: data,
  };
};

export const signinFailure = (error) => {
  return {
    type: USER_SIGNIN_FAILURE,
    payload: error,
  };
};

// Login
export const signin = (userinfo, afterLoginSuccess) => {
  return (dispatch) => {
    dispatch(signinRequest());
    const config = {
      method: "POST",
      url: `http://localhost:5000/api/user/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userinfo,
    };

    axios(config)
      .then((response) => {
        console.log("response ", response?.data);
        if(response.status === 200){
          dispatch(signinSuccess(response?.data));
          localStorage.setItem('userInfo', JSON.stringify(response?.data))
          afterLoginSuccess()
        }
      })
      .catch((err) => {
        console.log("err ", err?.response?.data?.message);
        dispatch(signinFailure(err?.response?.data?.message));
      });
  };
};

// Register
export const registerRequest = () => {
  return {
    type: USER_REGISTER_REQUEST,
  };
};

export const registerSuccess = (data) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: data
  };
};

export const registerFailure = (error) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error
  };
};

export const register = (userinfo, afterRegisterSuccess) => {
  return(dispatch) => {
    dispatch(registerRequest());

    const config = {
      method: "POST",
      url: `http://localhost:5000/api/user/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userinfo,
    };

    axios(config)
    .then((response) => {
      console.log("response ", response?.data);
      if(response.status === 200){
        dispatch(registerSuccess(response?.data));
        // dispatch(signinSuccess(response?.data));
        localStorage.setItem('userInfo', JSON.stringify(response?.data))
        afterRegisterSuccess()
      }
    })
    .catch((err) => {
      console.log("err full", err);
      console.log("err ", err?.response?.data?.message);
      dispatch(registerFailure(err?.response?.data?.message));
    });
  }
}