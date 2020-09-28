import axios from "axios";
import {GET_OWN_ORDERS, GET_SELLER_ORDERS} from "./types";

export const addOrder = (order, history) => dispatch => {
    axios.post("/api/orders", order)
        .then(res => {
            history.push("/orders")
        })
        .catch(err => {
            console.log(err.response.data)
        })
}
export const getOwnOrders = (page = 0) => dispatch => {
    axios.get("/api/orders?page=" +  (!page ? 0 : (page - 1)))
        .then(res => {
            dispatch({
                type: GET_OWN_ORDERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_OWN_ORDERS,
                payload: {
                    content: []
                }
            })

        })
}
export const getOrderOfSeller = (page = 0) => dispatch => {
    axios.get("/api/orders/seller?page=" + (!page ? 0 : (page - 1)))
        .then(res => {
            dispatch({
                type: GET_SELLER_ORDERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_SELLER_ORDERS,
                payload: {
                    content: []
                }
            })

        })
}
export const updateOrder = (order, id) => dispatch => {
    axios.put(`/api/orders/${id}`, order)
        .then(() => {
            dispatch(getOrderOfSeller())
            dispatch(getOwnOrders())
        })
        .catch(() => console.log())
}