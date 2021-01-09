import axios from "axios"
import {GET_ERRORS, GET_PRODUCT, GET_PRODUCTS} from "./types";
import isEmpty from "../validation/is-empty";

export const getProducts = (page = 0) => dispatch => {
    axios.get("/api/products?page=" + page)
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
export const getProductsByCategory = (page = 0, category = "all") => dispatch => {
    if (page === null)
        page = 0;
    axios.get(`/api/products/filter?page=${page}&category=${category}`)
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
        .then(res => {
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            }
        )
        .catch(() =>
            history.push("/not-found")
        )

}
export const getOwnProducts = (userId) => dispatch => {
    axios.get(`/api/products?user=${userId}`)
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(() =>
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            }))

}
export const addProduct = (categoryId, product, attach, history) => dispatch => {
    const file = new FormData();
    file.append('file', attach)
    axios.post("/api/attach/upload", file)
        .then(res => {
            const fileId = res.data;
            product.files = (fileId);
            console.log(categoryId)
            axios.post(`/api/products/${categoryId}`, product)
                .then((res) => {
                    history.push("/products")
                    console.log(res.data)
                })
                .catch(err => {
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        })
                        console.log(err.response.data)
                    }
                )
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                console.log(err.response.data)
            }
        )

}

export const updateProduct = (id, product, attach, history) => dispatch => {
    if (isEmpty(attach.id)) {
        const file = new FormData();
        file.append('file', attach)
        axios.post("/api/attach/upload", file)
            .then(res => {
                const fileId = res.data;
                product.files = (fileId);
                axios.put(`/api/products/${id}`, product)
                    .then((res) => {
                        history.push("/products")
                        console.log(res.data)
                    })
                    .catch(err => {
                            dispatch({
                                type: GET_ERRORS,
                                payload: err.response.data
                            })
                            console.log(err.response.data)
                        }
                    )
            })
            .catch(err => {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                    console.log(err.response.data)
                }
            )
    } else {
        product.files = [attach.id]
        console.log(product)
        axios.put(`/api/products/${id}`, product)
            .then(() => {
                history.push("/products")
            })
            .catch(err => {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                    console.log(err.response.data)
                }
            )
    }


}
export const deleteOwnProduct = (productId, userId) => dispatch => {
    axios.delete(`/api/products/${productId}`)
        .then(() => dispatch(getOwnProducts(userId)))
        .catch(() => dispatch(getOwnProducts(userId)))
}