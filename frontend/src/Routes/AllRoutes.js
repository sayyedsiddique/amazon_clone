import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import OrderItems from "../Components/OrderItems";

import MainLayout from "../MainLayout/MainLayout";
import About from "../Pages/About";
import CardPage from "../Pages/CardPage/CardPage";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Logout from "../Pages/Logout";
import PageNotFound from "../Pages/PageNotFound";
import PaymentMethod from "../Pages/PaymentMethod/PaymentMethod";
import Pending from "../Pages/Pending";
import OrderDetails from "../Pages/PlaceOrder/OrderDetails";
import PlaceOrder from "../Pages/PlaceOrder/PlaceOrder";
import Post from "../Pages/Post";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Register from "../Pages/Register/Register";
import ShippingAddress from "../Pages/ShippingAddress/ShippingAddress";
import Signin from "../Pages/Signin/Signin";

const AllRoutes = () => {
  const isLogged = true;
  const data = {
    st: "user not logged in",
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CardPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:status" element={<Post />} />
        <Route path="/post/order" element={<OrderItems />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        {/* <Route
          path="dashboard"
          element={isLogged ? <Dashboard /> : <Navigate to="/login" replace state={data}/>}
        /> */}

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
