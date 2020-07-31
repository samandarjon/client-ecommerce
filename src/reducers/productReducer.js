import {GET_PRODUCT, GET_PRODUCTS} from "../actions/types";

const initializeState = {
    products: {},
    product: {},
    loading: false
}
export default function (state = initializeState, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
                loading: true
            }
        }
        case GET_PRODUCT: {
            return {
                ...state,
                product: action.payload,
                loading: true
            }
        }
        default:
            return {
                ...state
            }

    }

}