import { combineReducers } from "redux";
import orderCreateReducer from "./order/orderReducer";
import { cartReducer } from "./productCart/cartReducer";
import { productReducer } from "./products/ProductReducer";
import { userReducer } from "./user/userReducer";

const rootReducer = combineReducers({
    productState:productReducer,
    cartState: cartReducer,
    user: userReducer,
    order: orderCreateReducer,
})
export default rootReducer