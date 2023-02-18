import React from 'react';
import Product from './Product';

export default function ProductList({title, products, colSm, colMd, colLg, colXl}) {
    return <section className="container-fluid">
        <h2 className="section-title mt-4">{title}</h2>
        <div className="row">
            {products.map((product) => {
                return (
                    <div key={product.id} className={`col-sm-${colSm} col-md-${colMd} col-lg-${colLg} col-xl-${colXl}`}>
                        <Product {...product} />
                    </div>
                )
            })}
        </div>
    </section>;
}
