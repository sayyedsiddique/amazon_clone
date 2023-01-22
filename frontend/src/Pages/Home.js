import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import redsweatshirt from "../assets/productImages/redsweatshirt.png";
import JacketP from "../assets/productImages/JacketP.png";
import BlackFrock from "../assets/productImages/BlackFrock.png";
import TShirt from "../assets/productImages/T-Shirt.png";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Product from "../Components/Product/Product";
import "./Home.css";
import data from "../data";
import axios from "axios";
import LoadingBox from "../Components/LoadingBox/LoadingBox";
import MessageBox from "../Components/MessageBox/MessageBox";
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../redux/products/ProductAction";

const Home = () => {
  const dispatch = useDispatch()
  const productsState = useSelector((state) => state.productState.products)
  const loading = useSelector((state) => state.productState.loading)

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className="homeContainer">
          {productsState &&
            productsState.map((item) => {
              return (
                <Product
                  id={item?._id}
                  img={item?.image}
                  productTitle={item?.name}
                  rating={item?.rating}
                  prodoctPrice={item?.price}
                  numReviews={item?.numReviews}
                  description={item?.description}
                  countInStock={10}
                />
              );
            })}
          {/* <Product
        id={1}
        img={redsweatshirt}
        productTitle="Red Sweater"
        rating={1.5}
        prodoctPrice="120"
        numReviews={10}
        description={'this is a red sweater'}
        countInStock={10}
      />
      <Product
        id={2}
        img={JacketP}
        productTitle="Nike Leather Jacket"
        rating={4}
        prodoctPrice="150"
        numReviews={10}
        description={'this is a Nike Leather Jacket'}
        countInStock={20}
      />
      <Product
        id={3}
        img={BlackFrock}
        productTitle="Black Frog"
        rating={5}
        prodoctPrice="200"
        numReviews={10}
        description={'this is a Black Frog'}
        countInStock={0}
      />
      <Product
        id={4}
        img={TShirt}
        productTitle="Red T-Shirt"
        rating={4.5}
        prodoctPrice="180"
        numReviews={10}
        description={'this is a red t shirt'}
        countInStock={5}
      /> */}
        </div>
      )}
    </>
  );
};

export default Home;
