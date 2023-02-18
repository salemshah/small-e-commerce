import React, {useContext} from "react";
import {TiShoppingCart} from 'react-icons/ti'
import {Link} from 'react-router-dom';
import {CartContext} from "../../context/cart";

export default function CartLink() {

  const {cartItem} = useContext(CartContext);
  return <div>
    <Link to="/cart" className="nav-link">
      <TiShoppingCart style={{fontSize: "30px"}}/>
      <span className="badge badge-pill badge-warning">{cartItem ? cartItem : 0}</span>
    </Link>
  </div>;
}
