import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import productProvider // product context
import Product from "./context/products";
// import cart context
import {CartProvider} from "./context/cart";
//import user context
import {UserProvider} from "./context/user";

ReactDOM.render(
  <UserProvider>
    <Product>
      <CartProvider>
        <App/>
      </CartProvider>
    </Product>
  </UserProvider>
  , document.getElementById("root"));
