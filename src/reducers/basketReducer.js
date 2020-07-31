import {ADD_TO_BASKET, GET_BASKET_ERRORS, GET_BASKET_ITEM} from "../actions/types";

const initialState = {
    message: {},
    items: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_BASKET: {
            return {message: action.payload}
        }

        case GET_BASKET_ITEM: {
            return {
                items: action.payload
            };
        }
        default:
            return {
                ...state
            }

    }

}