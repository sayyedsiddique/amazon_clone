import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Product.css";
import Rating from "../Rating/Rating";

function Product({
  id,
  img,
  productTitle,
  prodoctPrice,
  rating,
  numReviews,
  description,
  countInStock,
}) {
  const history = useNavigate();

  const productDetail = () => {
    history(`/product/${id}`, {
      state: {
        product: {
          id: id,
        },
      },
    });
  };

  return (
    <div className="product-card" key={id}>
      <div className="productImg">
        <img className="medium" src={img} alt="product" />
      </div>

      <div className="card-body">
        <div className="product-title">
          <h2 style={{ cursor: "pointer" }} onClick={productDetail}>
            {productTitle}
          </h2>
        </div>

        <Rating rating={rating} numReviews={numReviews} />

        <div className="price">
          <span>${prodoctPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
