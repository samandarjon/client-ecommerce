import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import basketReducer from "./basketReducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer,
    errors: errorReducer,
    baskets: basketReducer
});
