import React from "react";
import {Link} from "react-router-dom";

export default function Product({image, title, price, id}) {
  return (
    <div className="card mb-4">
      <div className="p-3" style={{
        backgroundImage: `url(${image})`,
    height: '20rem',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'

    }}>
        {/* <img className="card-img-top" src={} alt={title}/> */}
      </div>
      <div className="card-body">
        <h5 className="card-title block-with-text">{title}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-success text-center">{price} €</li>
      </ul>
      <div className="card-body">
        <Link to={`products-details/${id}`} className="btn btn-primary btn-block">detail</Link>
      </div>
    </div>
  );
}
