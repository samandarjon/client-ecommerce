import axios from "axios";
import {GET_ADDRESSES, GET_ERRORS} from "./types";

export const getAddress = () => dispatch => {
    axios.get("/api/addresses")
        .then(res => dispatch({
            type: GET_ADDRESSES,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const addAddress = (address, history) => dispatch => {
    axios.post("/api/addresses", address)
        .then(() => {
            dispatch(getAddress())
            history.pop()
        })
        .catch(err => {
            console.log(err)
        })
}
export const updateAddress = (address) => dispatch => {
    axios.put("/api/addresses", address)
        .then(() => {
            dispatch(getAddress())
        })
        .catch(err => {
            console.log(err)
        })
}
export const deleteAddress = (id) => dispatch => {

    axios.delete(`/api/addresses/${id}`)
        .then(() => dispatch(getAddress()))
        .catch(() =>
            console.log("Something is wrong")
        )
}