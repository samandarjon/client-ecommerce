import {GET_OWN_ORDERS, GET_SELLER_ORDERS} from "../actions/types";

const initialState = {
    consumer: {},
    seller: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OWN_ORDERS: {
            return {
                consumer: action.payload,
                seller: state.seller
            }
        }
        case GET_SELLER_ORDERS: {
            return {
                seller: action.payload,
                consumer: state.consumer
            }
        }
        default:
            return {
                ...state
            }

    }

}