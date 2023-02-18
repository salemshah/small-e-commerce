import React, {useContext} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {ProductContext} from "../context/products";
import {CartContext} from "../context/cart";
import Loading from "../components/Loading";

export default function ProductDetails() {
  const {addToCart} = useContext(CartContext)
  const {product_id} = useParams();
  const history = useHistory();
  const {products} = useContext(ProductContext);
  const product = products.find(product => product.id === parseInt(product_id));
  if (products.length === 0) {
    return <Loading/>
  } else {
    //ES6 double destructure
    // destructure the products: the (image) destructured also ("url" is inside "image object" and id renamed "url" to "imgUrl")
    const {image, title, price, description} = product;
    return <section className="single-product">
      <img src={image} alt={title} className="single-product-image"/>
      <article>
        <h1 className="">{title}</h1>
        <h1 className="">{price} € </h1>
        <p className="">{description}</p>
        <button className="btn btn-primary btn-block"
                onClick={() => {
                  addToCart(product);
                  history.push("/cart");
                }}>
          add to cart
        </button>
      </article>
    </section>;
  }
}
