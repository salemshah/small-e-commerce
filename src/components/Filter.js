import React, {useContext} from "react";
import {ProductContext} from "../context/products";

const Filter = () => {
    const {onchangePagination, filter: {maxPrice, minPrice, search}, onChange, price} = useContext(ProductContext)
    return (
        <form>
            <div className="d-flex justify-content-center">
                <div className="form-element-width">
                    <div>
                        <div className="form-group">
                            <label
                                htmlFor="formControlRange">Price {price} €</label>
                            <input type="range" max={maxPrice}
                                   min={minPrice} value={price}
                                   className="form-control-range"
                                   name="priceFilter"
                                   onChange={onChange}
                                   id="formControlRange"/>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="search">Search</label>
                            <input name="search" onChange={onChange} value={search} className="form-control" type="text"
                                   id="search"/>
                        </div>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="form-group">
                        <label htmlFor="pagination">Combien par page</label>
                        <select name="pagination" id="pagination" onChange={(e) => onchangePagination(e)}
                                className="form-control">
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Filter;