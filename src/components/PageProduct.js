import React, {useContext} from 'react';
import ProductList from "./Products/ProductList";
import {ProductContext} from "../context/products";

const PageProduct = () => {
    const {pagination, page} = useContext(ProductContext);

    if (pagination[page]) {
        return <ProductList title="Nos produits" colSm={6} colMd={4} colLg={3} colXl={2} products={pagination[page]}/>
    } else {
        return <h1>unfortunately your search query did not return any products</h1>
    }

};

export default PageProduct;
