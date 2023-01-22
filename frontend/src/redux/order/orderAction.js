import axios from "axios";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from "./orderType";
import { apiConfig, getToken } from "../../utils/constantFunction";
import { EmptyCartItem } from "../productCart/cartAction";

export const createOrderRequest = () => {
  return {
    type: ORDER_CREATE_REQUEST,
  };
};

export const createOrderSuccess = (data) => {
  return {
    type: ORDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const createOrderError = (error) => {
  return {
    type: ORDER_CREATE_FAILURE,
    payload: error,
  };
};

export const createOrderReset = () => {
  return {
    type: ORDER_CREATE_RESET,
    payload: {},
  };
};

export const createOrder = (data) => {
  return (dispatch) => {
    dispatch(createOrderRequest());

    console.log("data ", data)
    // const config = apiConfig(`${process.env.REACT_APP_API_URL}/api/orders`, "POST", data);
    // console.log("config ", config);

    const config = {
      method: "POST",
      url: `http://localhost:5000/api/orders`,
      headers: { Authorization: `Bearer ${getToken()}` },
      data: data,
    };

    console.log("config ", config)

    axios(config)
      .then((response) => {
        console.log("response order ", response);

        if (response.status === 200) {
          dispatch(createOrderSuccess(response.data.order));

          //   after order place cart empty
          dispatch(EmptyCartItem());
          localStorage.removeItem("cartItems");
        }
      })
      .catch((err) => {
        console.log("err order ", err);
        dispatch(
          createOrderError(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          )
        );
      });
  };
};


export const getOrderDetailsRequest = () => {
  return {
    type: GET_ORDER_REQUEST
  }
}

export const getOrderDetailsSuccess = (data) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: data
  }
}

export const getOrderDetailsFailure = (error) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: error
  }
}

export const getOrderDetails = (orderId) => {
  return(dispatch) => {
    dispatch(getOrderDetailsRequest())
    console.log("orderId ", orderId)

    const config = {
      method: "GET",
      url: `/api/orders/${orderId}`,
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    axios(config)
    .then((response) => {
      console.log("response orderDetails ", response);
      if (response.status === 200) {
        dispatch(getOrderDetailsSuccess(response?.data?.order));
      }
    })
    .catch((err) => {
      console.log("err orderDetails ", err);
      dispatch(
        getOrderDetailsFailure(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    });

  }
}
