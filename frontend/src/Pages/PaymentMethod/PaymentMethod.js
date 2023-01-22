import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import { savePaymentMethod } from "../../redux/productCart/cartAction";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const shippingAddress = useSelector(
    (state) => state?.cartState?.shippingAddress
  );
  const userInfo = useSelector((state) => state?.user?.userInfo);

//   if user not signin 
  useEffect(() => {
    if (!userInfo) {
      history("/signin");
    }
  }, [userInfo]);

  //   if user not filling shipping address
  useEffect(() => {
    if (!shippingAddress) {
      history("/shipping");
    }
  }, [shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  //   Radio button handler
  const radioInputHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  // form submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Payment Method</h1>
          </div>
          <div className="form-input-container flex-row gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="PayPal"
              checked={paymentMethod === "PayPal" ? true : false}
              onChange={radioInputHandler}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className="form-input-container flex-row gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe" ? true : false}
              onChange={radioInputHandler}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
          <div className="form-input-container">
            <button type="submit" className="primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
