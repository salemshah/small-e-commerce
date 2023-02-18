import React from "react";

//react router dom
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// import pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
// import header
import Header from "./components/Header";
import Alert from "./components/Alert"
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Header/>
      <Alert/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
        <PrivateRoute exact path="/checkout">
          <Checkout/>
        </PrivateRoute>
        <Route exact path="/products">
          <Products/>
        </Route>
        <Route exact path="/products-details/:product_id" children={<ProductDetails/>}/>
        <Route exact path="/login">
          <Login/>
        </Route>
        {/*error*/}
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
    </Router>
  );

}
