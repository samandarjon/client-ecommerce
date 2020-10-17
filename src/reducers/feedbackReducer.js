import {GET_FEEDBACKS} from "../actions/types";

const initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FEEDBACKS: {
            return action.payload;
        }
        default:
            return state;
    }
}
