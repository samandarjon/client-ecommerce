import axios from "axios";
import {GET_FEEDBACKS} from "./types";

export const getFeedback = (productId) => dispatch => {
    axios.get(`/api/feedback?productId=${productId}`)
        .then(res =>
            dispatch({
                type: GET_FEEDBACKS,
                payload: res.data
            })
        )
        .catch(err =>
            console.log(err.response.data)
        )
}
export const addFeedback = (feedback, history) => dispatch => {
    axios.post("/api/feedback", feedback)
        .then(res => dispatch(getFeedback(feedback.id)))
        .catch(err => history.push("/login"))
}