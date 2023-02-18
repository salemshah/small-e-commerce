import React, {useContext} from "react";
import ProductList from "./ProductList";
import {ProductContext} from "../../context/products";
import Loading from "../Loading";

export default function FeaturedProducts() {
    const {featured, loading} = useContext(ProductContext);

    if (loading) {
        return <Loading/>
    }
    return <ProductList title="Produits populaires" colSm={6} colMd={4} colLg={4} products={featured} />;

    //----------------------------- ce n'est pas active -------------
    /**
     * avec  ce manière on peut récupérer des Featured directement ça veux dire on a pas besoin de setFeatured state
     * d'abord on filtre avec (filter function) puis on le donne à (map fuction)
     */

    // const {products} = useContext(ProductContext);
    //
    // const featured1 = products.filter((product) => {
    //     return product.featured === true;
    // })
    //
    // return <ProductList title="featured products" products={featured1}/>


}
