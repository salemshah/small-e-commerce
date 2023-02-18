import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, Badge} from "react-bootstrap";
import {AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai'
import {BsHeartFill} from "react-icons/bs";
import CartLink from "./Cart/CartLink";
import {UserContext} from "../context/user";

export default function Header() {
    const {user, userLogout} = useContext(UserContext)
    return <>
        <div className="d-flex bg-light">
            <Link to="/" className="navbar-brand ml-4">
                <Badge variant="secondary">
                    <BsHeartFill style={{color: 'red', fontSize: "20px"}}/> Boutique-online
                </Badge>
            </Link>
            <Link to={user.token ? "/" : "/login"} className="nav-link ml-auto">
                {
                    !user.token ? <AiOutlineLogin className="text-info" style={{fontSize: "30px"}}/>
                        : <AiOutlineLogout
                            className="text-danger"
                            onClick={() => {
                                userLogout();
                            }}
                            style={{fontSize: "30px"}}
                        />
                }
            </Link>
            <CartLink/>
        </div>
        <Navbar sticky="top" bg="light" expand="xl">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Link to="/" className="nav-link">
                        Accueil
                    </Link>
                    <Link to="/products" className="nav-link">
                        Produits
                    </Link>
                    <Link to="/about" className="nav-link">
                        A Propos
                    </Link>
                    {
                        user.token
                            ? <Link to="/checkout" className="nav-link">
                                Checkout
                            </Link>
                            : ""
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>;
}
