import React, {useContext} from "react";
import {ProductContext} from '../context/products'
import Loading from '../components/Loading';
import Filter from "../components/Filter";
import PageProduct from "../components/PageProduct";

export default function Products() {
    let {loading, pagination, setPage, page, nextPage, previousPage} = useContext(ProductContext);
    const pageNumberElement = pagination.map((items, index) => {
        const pageNumber = index + 1;
        return <li className={`page-item no-select ${index === page ? "active" : ""}`} key={index}>
            <span style={{cursor: "pointer"}}
                  className="page-link"
                  onClick={() => setPage(index)}>
                {pageNumber}
            </span>
        </li>
    })

    if (loading) {
        return (
            <>
                <Loading/>
            </>);
    }
    return (
        <div className="container-fluid">
            <Filter/>
            <div className="d-flex flex-column align-items-center">
                {/*j'ai envoyé touts les element on une propre*/}
                <PageProduct/>
                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item no-select" style={{cursor: "pointer"}}
                                onClick={() => previousPage()}>
                                <span className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </span>
                            </li>
                            {pageNumberElement}
                            <li className="page-item no-select" style={{cursor: "pointer"}} onClick={() => nextPage()}>
                                <span className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
