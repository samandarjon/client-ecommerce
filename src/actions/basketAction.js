import axios from "axios";
import {GET_BASKET_ITEM} from "./types";

export const addToBasket = (product, history) => dispatch => {
    axios.post("/api/baskets", product)
        .then(res => {
            dispatch(getBasketItem())
        })
        .catch(err => {
                history.push("/login")
            }
        )
}
export const getBasketItem = () => dispatch => {
    axios.get("/api/baskets")
        .then(res => {
            dispatch({
                type: GET_BASKET_ITEM,
                payload: res.data
            })

        })
}
export const deleteBasketItem = (id) => dispatch => {
    axios.delete(`/api/baskets/${id}`)
        .then(res =>
            dispatch(getBasketItem())
        )
        .catch(err =>
            console.log(err)
        )
}