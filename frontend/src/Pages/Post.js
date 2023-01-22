import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { status } = useParams();

  const data = {
    name: "siddique",
    age: "27",
    status: 'online'
  };

  const orderItemHandler = () => {
    navigate('/post/order?status=pending', {state: data})
  };

  return (
    <div>
      <h2>Post Page - {status}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
        distinctio quos qui ducimus eum praesentium, voluptatum officiis
        suscipit dolore exercitationem natus eaque minima, voluptate sed cumque
        quis molestiae nihil quia!
      </p>
      <button onClick={orderItemHandler}>Go To he Order Items</button>
    </div>
  );
};

export default Post;
