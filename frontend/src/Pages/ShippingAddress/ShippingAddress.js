import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import { saveShippingAddress } from "../../redux/productCart/cartAction";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const shippingAddress = useSelector(
    (state) => state?.cartState?.shippingAddress
  );

  useEffect(() => {
    if (!userInfo) {
      history("/signin");
    }
  }, [userInfo]);

  // if user come back on shipping page after filling form
  // so form data refill in the form
  useEffect(() => {
    setField({
      fullname: shippingAddress?.fullname,
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      postalcode: shippingAddress?.postalcode,
      country: shippingAddress?.country
    });
  }, [shippingAddress]);

  const [field, setField] = useState({
    fullname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
  });

  const [error, setError] = useState({
    fullname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
  });

  // input handler
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
    setError({ ...error, [name]: "" });
  };

  // input validation
  const validation = () => {
    if (!field.fullname) {
      setError({ ...error, fullname: "Please fill your name" });
      return false;
    } else if (!field.address) {
      setError({ ...error, address: "Please fill address" });
      return false;
    } else if (!field.city) {
      setError({ ...error, city: "Please fill city" });
      return false;
    } else if (!field.postalcode) {
      setError({ ...error, postalcode: "Please fill potalCode" });
      return false;
    } else if (!field.country) {
      setError({ ...error, country: "Please fill country" });
      return false;
    }
    return true;
  };

  // form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const val = validation();
    if (val) {
      dispatch(saveShippingAddress(field));
      history("/payment");
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div className="form-input-container">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={field.fullname}
              placeholder="Enter full name"
              onChange={inputHandler}
            />
            {error.fullname && (
              <span className="text-danger">{error.fullname}</span>
            )}
          </div>
          <div className="form-input-container">
            <label for="address">Address</label>
            <input
              type="text"
              name="address"
              value={field.address}
              placeholder="Enter address"
              onChange={inputHandler}
            />
            {error.address && (
              <span className="text-danger">{error.address}</span>
            )}
          </div>
          <div className="form-input-container">
            <label for="city">City</label>
            <input
              type="text"
              name="city"
              value={field.city}
              placeholder="Enter city"
              onChange={inputHandler}
            />
            {error.city && <span className="text-danger">{error.city}</span>}
          </div>
          <div className="form-input-container">
            <label for="postalcode">Postalcode</label>
            <input
              type="text"
              name="postalcode"
              value={field.postalcode}
              placeholder="Enter postal code"
              onChange={inputHandler}
            />
            {error.postalcode && (
              <span className="text-danger">{error.postalcode}</span>
            )}
          </div>
          <div className="form-input-container">
            <label for="country">Country</label>
            <input
              type="text"
              name="country"
              value={field.country}
              placeholder="Enter country"
              onChange={inputHandler}
            />
            {error.country && (
              <span className="text-danger">{error.country}</span>
            )}
          </div>
          <div className="form-input-container">
            <label />
            <button type="submit" className="primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
