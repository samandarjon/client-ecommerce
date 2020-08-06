import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import basketReducer from "./basketReducer";
import feedbackReducer from "./feedbackReducer";
import addressReducer from "./addressReducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer,
    errors: errorReducer,
    baskets: basketReducer,
    feedback: feedbackReducer,
    addresses: addressReducer
});
