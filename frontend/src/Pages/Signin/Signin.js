import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { signin } from "../../redux/user/userAction";
import "./Signin.css";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const userInfoError = useSelector((state) => state.user.error);
  const [field, setField] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [redirect, setRedirect] = useState("");
  console.log("redirect ", redirect)

  useEffect(() => {
    // if user comes from checkout page so he rediret shipping page after signin
    let redirect = location?.search ? `/${location?.search.split("=")[1]}` : "/";
    setRedirect(redirect)
  }, [location?.search]);

  useEffect(() => {
    setApiError(userInfoError);
  }, [userInfoError]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const validation = () => {
    if (!field.email) {
      setError({ ...error, email: "Please enter email" });
      return false;
    } else if (!field.password) {
      setError({ ...error, password: "Please enter password" });
      return false;
    }
    return true;
  };

  const afterLoginSuccess = () => {
    history(redirect);
  };

  const submitHandler = () => {
    const val = validation();
    if (val) {
      dispatch(signin(field, afterLoginSuccess));
    }
  };

  return (
    <div className="signin_container">
      <div className="signin_box">
        <h1>Signin</h1>
        <div className="form_container d-flex row">
          <div className="d-flex row">
            <label for="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={field.email}
              onChange={inputHandler}
            />
            {error.email ? (
              <span className="text-danger">{error.email}</span>
            ) : null}
          </div>
          <div className="d-flex row">
            <label for="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={field.password}
              onChange={inputHandler}
            />
            {error.password ? (
              <span className="text-danger">{error.password}</span>
            ) : null}
          </div>
          <div className="d-flex row">
            <button className="primary block" onClick={submitHandler}>
              Submit
            </button>
          </div>
          <div className="mt-1">
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`} className="cursor">
              Create your account
            </Link>
          </div>
        </div>
      </div>
      {apiError ? (
        <MessageBox varient={"danger"}>{apiError} </MessageBox>
      ) : null}
    </div>
  );
};

export default Signin;
