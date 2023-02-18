import React, {createContext, useState, useEffect} from 'react';
import data from '../utils/localCart'
import axios from 'axios';
import URL from "../utils/URL";
import {featuredProduct, addExtraUrl, paginate} from "../utils/helpers";

//provider, consumer, useContext
export const ProductContext = createContext(null);

/**
 * @desc        find min or max of price
 * @type        it must be "max" or "min"
 * @data        it must be array or JSON array
 */

const getMaxOrMin = (type, data) => {
    return Math[type](...data.map(product => product.price))
}

const Product = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [price, setPrice] = useState(0);
    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [numberParPage, setNumberParPage] = useState(0)
    const [filter, setFilter] = useState({
        search: "",
        maxPrice: 0,
        minPrice: 0,
        category: "",
        priceFilter: 0,
    })
    console.log( "page", page)
    console.log( "pagination", pagination)
    console.log( "number par page", numberParPage)


    useEffect(() => {
        // setLoading(true);
        // axios.get(`${URL}/products`)
        //     .then((storeProducts) => {
        //     });
                // const products = addExtraUrl(storeProducts.data);
                // const featured = featuredProduct(addExtraUrl(storeProducts.data));
                setProducts(data);
                setFilter({
                    ...filter,
                    maxPrice: Math.ceil(getMaxOrMin('max', data) + 1),
                    minPrice: getMaxOrMin('min', data),
                    priceFilter: getMaxOrMin('max', data)
                });
                setPrice(Math.ceil(getMaxOrMin('max', data)) + 1)
                setFeatured(data);
                // setLoading(false);
        return () => {
        }
    }, []);

    const onchangePagination = (e) => {
        const value = parseInt(e.target.value)
        setNumberParPage(value);
    }

    useEffect(() => {

        let {priceFilter, search} = filter
        priceFilter = parseFloat(priceFilter);

        //sort
        setPrice(priceFilter);
        let newFilterProduct = [...products].sort((a, b) => a.price - b.price);

        newFilterProduct = newFilterProduct.filter(product => {
            return product.price <= priceFilter;
        })
        if (search !== "") {
            newFilterProduct = newFilterProduct.filter(product => {
                const title = product.title.toLowerCase().trim();
                return title.includes(search);
            })
        }
        setPagination(paginate(newFilterProduct, numberParPage))
    }, [filter, products, numberParPage])


    const onChange = (e) => {
        if (pagination.length < (page + 1)) {
            setPage(pagination.length - 1);
        }
        if (pagination.length === 0) {
            setPage(0)
        }
        const value = e.target.value
        const name = e.target.name;
        setFilter({...filter, [name]: value})
    }

    const changePage = (pageNumber) => {
        setPage(pageNumber);
    }
    const nextPage = () => {
        if (pagination.length > page + 1) {
            setPage(page + 1)
        }
    }

    const previousPage = () => {
        if (0 < page) {
            setPage(page - 1)
        }
    }
    return (
        <ProductContext.Provider
            value={{
                loading,
                products,
                featured,
                price,
                onChange,
                filter,
                page,
                changePage,
                setPage,
                nextPage,
                pagination,
                previousPage,
                onchangePagination
            }}>
            {children}
        </ProductContext.Provider>
    );
};

export default Product;
