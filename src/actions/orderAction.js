import axios from "axios";
import {GET_ORDERS} from "./types";

export const addOrder = (order, history) => dispatch => {
    axios.post("/api/orders", order)
        .then(res => {
            history.push("/dashboard")
        })
        .catch(err => {
            console.log(err.response.data)
        })
}
export const getOwnOrders = () => dispatch => {
    axios.get("/api/orders")
        .then(res => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ORDERS,
                payload: {
                    content: []
                }
            })

        })
}