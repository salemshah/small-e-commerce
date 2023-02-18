import React from "react";
import {Link} from 'react-router-dom'

export default function EmptyCart() {
    return <section className="empty-cart section">
        <h2 className="section-title">Pas d'article dans le painier</h2>
        <Link to="/products" className="btn btn-primary">Fair des achat</Link>
    </section>;
}
