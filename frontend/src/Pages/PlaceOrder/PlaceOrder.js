import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { createOrder, createOrderReset } from "../../redux/order/orderAction";

const PlaceOrder = () => {
  const history = useNavigate();
  const dispatch = useDispatch()
  const shippingAddress = useSelector(
    (state) => state?.cartState?.shippingAddress
  );
  const orderCreate = useSelector((state) => state.order)
  const {loading, success, error, orderState} = orderCreate
  const paymentMethod = useSelector((state) => state?.cartState?.paymentMethod);
  const cartItems = useSelector((state) => state?.cartState?.cartItems);
  console.log("cartItems ", cartItems)
  const [cartItemsSubPrice, setCartItemsSubPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [productsTotalPrice, setProductsTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);


  // if payment method not selected user redirected to payment page
  useEffect(() => {
    if (!paymentMethod) {
      history("/payment");
    }
  }, []);

  // if user dont have an item in cart
  useEffect(() => {
    if (cartItems.length === 0) {
      history("/cart");
    }
  }, [cartItems]);

  // Fixed decimal point price
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  useEffect(() => {
    // all cart items price merge into one total price
    setCartItemsSubPrice(
      toPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0))
    );

    // tax price according to product
    setTaxPrice(0.15 * cartItemsSubPrice);

    // Shipping Price
    setShippingPrice(cartItemsSubPrice > 100 ? toPrice(0) : toPrice(10));

    // sub the product price into on total price including all charges
    setProductsTotalPrice(cartItemsSubPrice + taxPrice + shippingPrice);
  }, [cartItems, cartItemsSubPrice, shippingPrice]);

  // place order handler 
  const placeOrderHandler = () => {
    const newProdArr = []
   
    cartItems && cartItems.map((item) => {
      const obj =  {
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id
      }

      newProdArr.push(obj)
    })

    const orderItem = {
      orderItems: newProdArr && newProdArr,
      shippingAddress: shippingAddress && shippingAddress,
      paymentMethod: paymentMethod && paymentMethod,
      itemsPrice: cartItemsSubPrice && cartItemsSubPrice,
      shippinPrice: shippingPrice && shippingPrice,
      taxPrice: taxPrice && taxPrice,
      totalPrice: productsTotalPrice && productsTotalPrice,
    }
    cartItems.length > 0 && dispatch(createOrder(orderItem))
  }

  useEffect(() => {
    if(success){
      history(`/order/${orderState?._id}`)
      dispatch(createOrderReset())
    }
  },[success])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row placeOrder-container mx-0">
        <div className="col-8">
          <div className="order-info">
            <h4>Shipping</h4>
            <p>Name: {shippingAddress && shippingAddress?.fullname}</p>
            <p> Address: {shippingAddress && shippingAddress?.address}</p>
          </div>
          <div className="order-info">
            <h4>Payment</h4>
            <p> Method: {paymentMethod && paymentMethod}</p>
          </div>
          <div className="order-info">
            <h4>Order Items</h4>
            {cartItems &&
              cartItems?.map((item, index) => {
                return (
                  <div key={index} className="order-items">
                    <img src={item?.image} alt="" />
                    <Link to={`/product/${item?._id}`}>{item?.name}</Link>
                    <p>
                      {item.qty} x {item.price} = ${item.qty * item.price}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-4">
          <div className="order-info">
            <h4>Order Summary</h4>
            <div className="order-summary-item">
              <p>Item: </p>
              <p className="font-bold">${cartItemsSubPrice.toFixed(2)}</p>
            </div>
            <div className="order-summary-item">
              <p>Shipping: </p>
              <p className="font-bold">${shippingPrice.toFixed(2)}</p>
            </div>
            <div className="order-summary-item">
              <p>Tax: </p>
              <p className="font-bold">${taxPrice.toFixed(2)}</p>
            </div>
            <div className="order-summary-item">
              <p>Total: </p>
              <p className="font-bold">${productsTotalPrice.toFixed(2)}</p>
            </div>
            <button type="submit" className="primary w-100" onClick={placeOrderHandler}>
              Place Order
            </button>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox varient='danger'>{error}</MessageBox>}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
