import React, {useContext} from "react";
import {TiPlus, TiMinus} from 'react-icons/ti';
import {IoIosRemoveCircle} from 'react-icons/io'
import {CartContext} from "../../context/cart";

export default function CartItem(props) {
  const {removeItem, increaseAmount, decreaseAmount} = useContext(CartContext);
  const {id, image, price, title, amount} = props.item;
  return <tr>
    <td className="remove-btn">
      <IoIosRemoveCircle onClick={() => removeItem(id)} className="text-danger io-btn" style={{fontSize: "1.2rem"}}/>
    </td>
    <td>
      <div style={{maxWidth: "13rem"}}>
        <img src={image} className="img-fluid" alt={title}/>
      </div>
    </td>
    <td className="text-center" style={{verticalAlign: "middle"}}>
      <div>
                <span onClick={() => {
                  increaseAmount(id);
                }} className="no-select badge badge-pill btn-clickable badge-secondary btn-inc-dec"
                      style={{cursor: "pointer"}}><TiPlus/></span>
      </div>
      <div className="p-1">{amount}</div>
      <div>
                <span onClick={() => decreaseAmount(id, amount)}
                      className="no-select badge badge-pill btn-clickable badge-secondary">
                  <TiMinus/>
                </span>
      </div>
    </td>
    <td className="text-center" style={{verticalAlign: "middle"}}>{price} €</td>
    <td className="text-center" style={{verticalAlign: "middle"}}>{(price * amount).toFixed(2)} €</td>
  </tr>;
}
