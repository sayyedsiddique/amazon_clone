import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import data from "../../data";
import Rating from "../../Components/Rating/Rating";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../redux/products/ProductAction";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { AddProductInCart } from "../../redux/productCart/cartAction";

function ProductDetails(props) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation()
  const params = useParams();
  const productDetails = useSelector(
    (state) => state.productState.detailsProduct
  );
 
  const loading = useSelector((state) => state.productState.loading);
  const error = useSelector((state) => state.productState.error);
  const [qty, setQty] = useState(1);

  // calling product details API
  useEffect(() => {
    dispatch(detailsProduct(params.id));
  }, [dispatch, params.id]);

  // Quantity handler
  const qtyHandler = (e) => {
    setQty(Number(e.target.value))
  }

  // Add to cart handler
  const addToCartHandler = () => {
    history(`/cart`, {
      state: {
        productId: params.id,
        productQty: qty
      },
    });
        dispatch(AddProductInCart(params.id, qty))
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="productDetails_container">
          <div className="img_container">
            <img
              src={productDetails && productDetails?.product?.image}
              alt={productDetails && productDetails?.product?.image}
            />
          </div>

          <div className="product_details">
            <h3 className="prodoct_title">
              {productDetails && productDetails?.product?.productTitle}
            </h3>
            <div className="product_rating">
              <Rating
                rating={productDetails && productDetails?.product?.rating}
                numReviews={
                  productDetails && productDetails?.product?.numReviews
                }
              />
            </div>
            <p className="product_price">
              Price: ${productDetails && productDetails?.product?.price}
            </p>
            <p className="product_price">
              Description:{" "}
              {productDetails && productDetails?.product?.description}
            </p>
          </div>

          <div className="productDetail_card_container">
            <div className="card card-body">
              <div className="cart_price">
                <p>Price:</p>
                <p className="product_price">
                  ${productDetails && productDetails?.product?.price}
                </p>
              </div>
              <div className="cart_status">
                <p>Status:</p>
                {productDetails && productDetails?.product?.countInStock > 0 ? (
                  <span className="success">In Stock</span>
                ) : (
                  <span className="error">Unavailable</span>
                )}
              </div>
              <div className="cart_status">
                <p>Qty:</p>
                <select onChange={qtyHandler}>
                  {[...Array(productDetails?.product?.countInStock).keys()].map(
                    (count) => {
                      return (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              {productDetails?.product?.countInStock > 0 && (
                <button className="primary block" onClick={addToCartHandler}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
