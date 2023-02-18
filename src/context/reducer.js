
import {ADD, DECREASE, INCREASE, REMOVE} from "./action"
const increase = (state, id) => {
    return state.map(item => {
        return item.id === id ? {...item, amount: item.amount + 1} : item;
    });
}

export default (state, action) => {
    switch (action.type) {
        case REMOVE:
            return state.filter(item => {
                return item.id !== action.payload
            });
        case INCREASE:
            return increase(state, action.payload);
        case ADD:
            const result = state.find(item => item.id === action.payload.id)
            if (result) {
                return increase(state, action.payload.id);
            } else {
                return [...state, {...action.payload, amount: 1, image: action.payload.image}]
            }
        case DECREASE:
            return state.map(item => {
                return item.id === action.payload ? {...item, amount: item.amount - 1} : item;
            })
        default:
            return state
    }
}