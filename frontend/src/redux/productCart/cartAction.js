import axios from "axios";
import { json } from "body-parser";
import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIIPING_ADDRESS } from "./cartTypes";

const cartAddItem = (product) => {
  return {
    type: CART_ADD_ITEM,
    payload: product,
  };
};

export const AddProductInCart = (productId, qty) => {
  return async (dispatch, getState) => {
    const data = await axios.get(`/api/products/${productId}`);

    let product = {
      ...data.data.product,
      qty: qty,
    };
    dispatch(cartAddItem(product));

    let cartItems = getState();
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems?.cartState?.cartItems)
    );
  };
};

export const removeCartItem = (productId) => {
  return {
    type: CART_REMOVE_ITEM,
    payload: productId,
  };
};

export const RemoveProductFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch(removeCartItem(productId));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState()?.cartState?.cartItems)
    );
  };
};


// Empty cart item in redux
export const EmptyCartItem = () => {
  return {
    type : CART_EMPTY,
    payload: []
  }
}

// Save shipping address
export const saveShippingAddress = (data) => {
  return(dispatch) => {
    dispatch({type: CART_SAVE_SHIIPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
}

// Save payment method
export const savePaymentMethod = (data) => {
  return(dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
}
