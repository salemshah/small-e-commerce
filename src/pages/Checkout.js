import React, {useContext, useState} from "react";
import {CartContext} from "../context/cart";
import {UserContext} from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";

import {FaUser} from 'react-icons/fa'
import submitOrder from "../strapi/submitOrder"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HPElyFcXPVLam1sxtnLTndvgg9qKtATBHZcRhRm0kCmsVHh6n1AidxCTSEbKUqCAVRqYDVQ2tkvY1SOh4iymAU7008diTIigk');


function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const {cart, total} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const [name, setName] = useState('');


    if (cart.length < 1) {
        return <EmptyCart/>
    }


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const {paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,

        });

            const {id} = paymentMethod;

            let order = await submitOrder({
                name: name,
                total: total,
                items: cart,
                stripeTokenId: id,
                userToken: user.token
            });

            if(order){
                console.log("your payment is done successfully")
            }else{
                console.log("order error ===>",order )
            }
        }


    return <section className="container">
        <form onSubmit={handleSubmit}>
            <div className="card bg-light">
                <div className="card-header text-center">
                    check-out
                </div>
                <div className="card-body">
                    <h5 className="card-title">Light card title</h5>
                    <div>
                        <label htmlFor="username">Username</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FaUser/>
                            </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Your username is required.
                            </div>
                        </div>

                        <div>
                            <CheckoutForm/>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    </section>;
}

export default function App() {
    return (
        <Elements stripe={stripePromise}>
            <Checkout/>
        </Elements>
    );
};


const CheckoutForm = () => {
    return (
        <div>
            <div className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </div>
            <div className="mt-2 text-center">
                <button type="submit" className="btn btn-block btn-primary">Payer</button>
            </div>
        </div>
    );
};

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#939393',
            color: '#939393',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {color: '#939393'},
            '::placeholder': {color: '#939393'},
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
        },
    },
};
