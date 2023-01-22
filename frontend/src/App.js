import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import dotenv from 'dotenv'

function App() {
  dotenv.config()
  
  return (
    <React.Fragment>
        <AllRoutes />
    </React.Fragment>
  );
}

export default App;
