import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { AddProductInCart, RemoveProductFromCart } from "../../redux/productCart/cartAction";

const CardPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate()
  const cartState = useSelector((state) => state?.cartState?.cartItems);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [cartItems, setCartItems] = useState([])
  // console.log("cartState ", cartState)

  useEffect(() => {
    setCartItems(cartState)
  },[cartState])

  const removeFromCartHandler = (cartId) => {
    // let carts = cartState.filter((item) => item?._id !== cartId)
    // localStorage.setItem('cartItems', JSON.stringify(carts))
    // carts && setCartItems(carts)
    // console.log("carts ", carts);
    dispatch(RemoveProductFromCart(cartId))
  };

  const checkOuthandler = () => {
    if(!userInfo){
      history('/signin?redirect=shipping')
    } else {
      history('/shipping')
    }
  };

  return (
    <div className="row top">
      <div className="col-8">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart it empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <li key={item._id} className="d-flex">
                    <div className="row">
                      <div>
                        <img className="img small" src={item?.image} alt="" />
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item?._id}`}>{item?.name}</Link>
                      </div>
                      <div>
                        <select
                          name=""
                          id=""
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              AddProductInCart(item._id, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((count) => {
                            return (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>${item.price}</div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div className="col-4">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkOuthandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Process to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
