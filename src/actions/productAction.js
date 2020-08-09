import axios from "axios"
import {GET_ERRORS, GET_PRODUCT, GET_PRODUCTS} from "./types";

export const getProducts = () => dispatch => {
    axios.get("/api/products")
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
            }
        )
}
export const getProduct = (id, history) => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res =>
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        )
        .catch(err =>
            history.push("/not-found")
        )

}
export const getOwnProducts = (userId) => dispatch => {
    axios.get(`/api/products?user=${userId}`)
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            }))

}
export const deleteOwnProduct = (productId, userId) => dispatch=>{
    axios.delete(`/api/product/${productId}`)
        .then(()=>dispatch(getOwnProducts(userId)))
        .catch(()=>dispatch(getOwnProducts(userId)))
}