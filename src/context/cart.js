// cart context

import React, {createContext, useState, useEffect, useReducer} from 'react';
import reduce from './reducer';

import {ADD, DECREASE, INCREASE, REMOVE} from "./action"
const CartContext = createContext(null);
const getCartItemFromLocalStorage = () => {
    return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
};

const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(reduce, getCartItemFromLocalStorage());
    const [total, setTotal] = useState(0);
    const [cartItem, setCartItem] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));

        let newCartItems = cart.reduce((total, cartItem) => {
            return total + cartItem.amount;
        }, 0);
        setCartItem(newCartItems);

        //cart total
        let newTotal = cart.reduce((total, cartItem) => {
            return (total + cartItem.amount * cartItem.price);
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
    }, [cart]);

    /*--------------calculate single items from cart----------*/


    /*--------------remove items from cart----------*/
    const removeItem = (id) => {
        dispatch({type: REMOVE, payload: id,})
    };
    /*--------------increase items from cart----------*/
    const increaseAmount = (id) => {
        dispatch({type: INCREASE, payload: id})

    };
    /*--------------decrease items from cart----------*/
    const decreaseAmount = (id, amount) => {
        if (amount <= 1) {
            dispatch({type: REMOVE, payload: id});
        } else {
            dispatch({type: DECREASE, payload: id});
        }
    };


    /*-------------- add to cart from product detail page ----------*/
    const addToCart = (product) => {
        dispatch({type: ADD, payload: product})
    };

    /*--------------remove all items from cart----------*/
    const clearCart = () => {

    };

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                cartItem,
                removeItem,
                increaseAmount,
                decreaseAmount,
                addToCart,
                clearCart
            }}>
            {children}
        </CartContext.Provider>
    );
};

export {CartProvider, CartContext};
