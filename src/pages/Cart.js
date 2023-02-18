import React, {useContext} from "react";
import {CartContext} from '../context/cart.js'
import {UserContext} from '../context/user'
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import {Link} from 'react-router-dom'
import {Table} from "react-bootstrap";

export default function Cart() {
    //let user = false;
    const {cart, total} = useContext(CartContext);
    const {user} = useContext(UserContext);
    if (cart.length === 0) {
        return <EmptyCart/>
    }

    return <section className="container pt-4 text-center">
        <h2>Votre painier</h2>
        <Table responsive="sm" className="mt-4">
            <thead>
            <tr>
                <th>
                    Action
                </th>
                <th>Description</th>
                <th>quantité</th>
                <th>prix unitaire</th>
                <th>Prix Total</th>
            </tr>
            </thead>
            <tbody>
            {
                cart.map((item, index) => {
                    return <CartItem key={item.id} item={item}/>
                })
            }
            </tbody>
        </Table>

        <h2>Total : {total} €</h2>

        <div className="mb-5">
            {
                user.token ?
                    <Link to="/checkout" className="btn btn-secondary btn-block">Check-out</Link>
                    :
                    <Link to="/login" className="btn btn-secondary btn-block">connexion</Link>
            }
        </div>
    </section>;
}
