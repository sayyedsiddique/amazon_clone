import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { register, signin } from "../../redux/user/userAction";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // if user comes from checkout page our user has no account
  //  he redirects shipping page after register
  let redirect = location?.search ? location?.search.split("=")[1] : "/";

  const history = useNavigate();
  const [field, setField] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [apiError, setApiError] = useState("");

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const validation = () => {
    if (!field.username) {
      setError({ ...error, username: "Please enter name" });
    } else if (!field.email) {
      setError({ ...error, email: "Please enter email" });
      return false;
    } else if (!field.password) {
      setError({ ...error, password: "Please enter password" });
      return false;
    } else if (!field.confirmpassword) {
      setError({ ...error, confirmpassword: "Please enter confirmpassword" });
      return false;
    }
    return true;
  };

  const afterRegisterSuccess = () => {
    history(redirect);
  };

  const submitHandler = () => {
    const val = validation();
    console.log("value is not valid");
    if (val) {
      if (field.password !== field.confirmpassword) {
        setError({
          ...error,
          confirmpassword: "Password and comfirm password are not match",
        });
      } else {
        const user = {
          name: field.username,
          email: field.email,
          password: field.password,
        };

        dispatch(register(user, afterRegisterSuccess));
      }
      console.log("value is valid");
    }
  };

  return (
    <div className="signin_container">
      <div className="signin_box">
        <h1>Register</h1>
        <div className="form_container d-flex row">
          <div className="d-flex row">
            <label for="">Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter name"
              value={field.username}
              onChange={inputHandler}
            />
            {error.username ? (
              <span className="text-danger">{error.username}</span>
            ) : null}
          </div>
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
            <label for="">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Enter password"
              value={field.confirmpassword}
              onChange={inputHandler}
            />
            {error.confirmpassword ? (
              <span className="text-danger">{error.confirmpassword}</span>
            ) : null}
          </div>
          <div className="d-flex row">
            <button className="primary block" onClick={submitHandler}>
              Register
            </button>
          </div>
          <div className="mt-1">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`} className="cursor">
              Sign-In
            </Link>
          </div>
        </div>
      </div>
      {/* {apiError ? <MessageBox varient={"danger"}>{apiError} </MessageBox> : null} */}
    </div>
  );
};

export default Register;
