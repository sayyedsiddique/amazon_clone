import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IconContext } from "react-icons/lib";

const NavBar = () => {
  const location = useLocation();
  const history = useNavigate()
  const cartState = useSelector((state) => state?.cartState?.cartItems);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [qty, setQty] = useState("");
  // console.log("userInfo ", userInfo);

  useEffect(() => {
    cartState &&
      cartState.map((item) => {
        // console.log("item NavBar ", item?.qty);
        setQty(item?.qty);
      });
  }, [cartState]);

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    window.location.reload("/");
  };

  return (
    <div className="navContainer">
      <div className="rightSide">
        <Link to="/">Amazon</Link>
      </div>

      <div className="leftSide">
        <Link to="/cart" className="cart-link">
          Cart
          {cartState.length > 0 ? (
            <span className="cart-item-badge">{cartState?.length}</span>
          ) : null}
        </Link>
        {userInfo && userInfo ? (
          //   <Link to="#">{userInfo?.name}</Link>
          <div className="dropdown">
            <div className="signin">
              <p className="cursor-pointer">
                {userInfo?.name}
              </p>
              <IconContext.Provider value={{ size: "30px" }}>
                <RiArrowDropDownLine />
              </IconContext.Provider>
            </div>
            <div className="signout">
              <p onClick={logOutHandler}>Singout</p>
            </div>
          </div>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
