import {GET_ADDRESSES} from "../actions/types";

const initialState = {
    addresses: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADDRESSES: {
            return {
                addresses: action.payload
            }
        }
        default:
            return {
                ...state
            }

    }

}