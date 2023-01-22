import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { getOrderDetails } from "../../redux/order/orderAction";
import { PayPalButton } from "react-paypal-button-v2";

const OrderDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const shippingAddress = useSelector(
    (state) => state?.cartState?.shippingAddress
  );
  const [sdkReady, setSdkReady] = useState(false);
  console.log("sdkReady ", sdkReady);
  const orderState = useSelector((state) => state?.order?.orderDetails);
  const loading = useSelector((state) => state?.order?.loading);
  const error = useSelector((state) => state?.order?.error);

  const [orderId, setorderId] = useState("");

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      console.log("data ", data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!orderId) {
      dispatch(getOrderDetails(orderId));
    } else if (!orderState?.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, orderState?.isPaid, sdkReady]);

  useEffect(() => {
    setorderId(location?.pathname.split("/")[2]);
    console.log("orderState ", orderState);
  }, [location, orderState]);

  // Fixed decimal point price
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  // place order handler
  const placeOrderHandler = () => {};

  const successPaymentHandler = () => {
    
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox varient="danger">{error}</MessageBox>
  ) : (
    <div className="row placeOrder-container mx-0">
      <h2>Order: {orderId}</h2>
      <div className="col-8">
        <div className="order-info">
          <h4>Shipping</h4>
          <p>Name: {shippingAddress && shippingAddress?.fullname}</p>
          <p>Address: {shippingAddress && shippingAddress?.address}</p>
          <p>City: {shippingAddress && shippingAddress?.city}</p>
          <p>postalcode: {shippingAddress && shippingAddress?.postalcode}</p>
          <p>Country: {shippingAddress && shippingAddress?.country}</p>
          {orderState?.isDelivered ? (
            <MessageBox varient="success">
              Delivered at {orderState?.deliveredAt}
            </MessageBox>
          ) : (
            <MessageBox varient="danger">Not Delivered</MessageBox>
          )}
        </div>
        <div className="order-info">
          <h4>Payment</h4>
          <p> Method: {orderState && orderState?.paymentMethod}</p>
          {orderState?.isPaid ? (
            <MessageBox varient="success">
              Paid at {orderState?.paidAt}
            </MessageBox>
          ) : (
            <MessageBox varient="danger">Not Paid</MessageBox>
          )}
        </div>
        <div className="order-info">
          <h4>Order Items</h4>
          {orderState &&
            orderState?.orderItems?.map((item, index) => {
              return (
                <div key={index} className="order-items">
                  <img src={item?.image} alt="" />
                  <Link to={`/product/${item?.product}`}>{item?.name}</Link>
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
            <p className="font-bold">${orderState?.itemsPrice?.toFixed(2)}</p>
          </div>
          <div className="order-summary-item">
            <p>Shipping: </p>
            <p className="font-bold">${orderState?.shippinPrice?.toFixed(2)}</p>
          </div>
          <div className="order-summary-item">
            <p>Tax: </p>
            <p className="font-bold">${orderState?.taxPrice?.toFixed(2)}</p>
          </div>
          <div className="order-summary-item">
            <p>Total: </p>
            <p className="font-bold">${orderState?.totalPrice?.toFixed(2)}</p>
          </div>
          {!orderState?.isPaid && !sdkReady ? (
            <LoadingBox></LoadingBox>
          ) : (
            <PayPalButton
              amount={orderState?.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
