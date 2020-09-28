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
export const addAddress = (address, history) => () => {
    axios.post("/api/addresses", address)
        .then(() => history.pop())
        .catch(err => {
            console.log(err)
        })
}