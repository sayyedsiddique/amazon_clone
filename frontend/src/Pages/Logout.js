import React from "react";
import { useLocation } from "react-router-dom";

const Logout = () => {
  const { state } = useLocation();

  const dataValue =
    state.name !== null ? (
      <h2>{state.name} Logged Out</h2>
    ) : (
      <h2>Somthing was Wrong</h2>
    );

  if (state.name !== null) {
    return <h2>{state.name} Logged Out</h2>;
  } else {
    <h2>Somthing was Wrong</h2>;
  }
  
  return (
    <div>
      <h1>Logout Page</h1>
      {dataValue}
    </div>
  );
};

export default Logout;
