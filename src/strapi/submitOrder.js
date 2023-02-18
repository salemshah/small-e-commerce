// submit order

import axios from 'axios'
import url from "../utils/URL"

async function submitOrder({name, total, items, stripeTokenId, userToken}) {
    return await axios.post(`${url}/orders`, {
        name, total, items, stripeTokenId
    }, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).catch((e) => console.log(e));
}

export default submitOrder;