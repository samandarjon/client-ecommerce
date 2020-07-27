import axios from "axios";
import {GET_CATEGORIES} from "./types";

export const getCategories = () => dispatch => {
    axios
        .get("/api/categories")
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data._embedded.categories
            })
        }).catch(error => console.log(error.response))
}