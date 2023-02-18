// helper functions

import url from "./URL";

export function addExtraUrl(data) {
    return data.map(item => {
        let image = `${url}${item.image.url}`;
        return {...item, image: {url: image}}
    })
}

export const featuredProduct = (data) => {
    return (
        data.filter(items => items.featured === true)
    );
};


export function paginate(products, numberParPage) {
    const itemsPerPage = numberParPage > 0 ? numberParPage : 2;
    let numberOfPages
    if (itemsPerPage !== 0)
        numberOfPages = Math.ceil(products.length / itemsPerPage);
    else
        numberOfPages = Math.ceil(products.length / 1);
    // const newProducts = Array.from({length: numberOfPages}, () => {
    //   return products.splice(0, itemsPerPage);
    // });

    const newProducts1 = Array.from({length: numberOfPages}, (_, index) => {
        const start = index * itemsPerPage;
        //console.log(start + itemsPerPage)
        return products.slice(start, start + itemsPerPage)
    });

    return newProducts1;
}