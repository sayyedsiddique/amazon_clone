import axios from "axios";
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./ProductTypes";

export const listProductsRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};

export const listProductsSuccess = (data) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};

export const listProductsFailure = (error) => {
  return {
    type: PRODUCT_LIST_FAILURE,
    payload: error,
  };
};

export const listProducts = () => {
  return async (dispatch) => {
    dispatch(listProductsRequest());

    try {
      const data = await axios.get("/api/products");
      console.log("data ", data)
      dispatch(listProductsSuccess(data.data.products));
    } catch (err) {
      dispatch(listProductsFailure());
    }
  };
};

// Getting Product details
export const detailsProductRequest = () => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  };
};

export const detailsProductSuccess = (data) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: data,
  };
};

export const detailsProductFailure = (error) => {
  return {
    type: PRODUCT_DETAILS_FAILURE,
    payload: error,
  };
};

export const detailsProduct = (productId) => {
  return (dispatch) => {
    dispatch(detailsProductRequest());

    axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        console.log("response ", response);
        dispatch(detailsProductSuccess(response.data));
      })
      .catch((error) => {
        // console.log("response error ", error.message)
        dispatch(
          detailsProductFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      });
  };
};
