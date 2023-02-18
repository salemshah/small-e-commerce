import React from "react";
import Hero from "../components/Hero";
import {Link} from "react-router-dom";
import FeaturedProducts from "../components/Products/FeaturedProducts";

export default function Home() {
    return <div className="container">
        <Hero>
            <div className="d-flex h-100 pb-5 align-items-center flex-column">
                <Link to="/products" className="btn btn-primary mt-auto">
                    Notre produis
                </Link>
            </div>
        </Hero>
        <FeaturedProducts/>
    </div>;
}
