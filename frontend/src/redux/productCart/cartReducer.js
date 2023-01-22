import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIIPING_ADDRESS,
} from "./cartTypes";

const initialCartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
  paymentMethod: 'PayPal'
};

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // console.log("cartReducer item ", item)
      // console.log("cartReducer action.payload ", action.payload)
      const existingItem = state?.cartItems.find(
        (cartItem) => cartItem?._id === action.payload?._id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state?.cartItems.map((x) =>
            x?._id === existingItem?._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item?._id !== action.payload
        ),
      };
    case CART_SAVE_SHIIPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        };
      case CART_EMPTY: {
        return {
          ...state, 
          cartItems: action.payload
        }
      }

    default:
      return state;
  }
};
