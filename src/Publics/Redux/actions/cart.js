import axios from 'axios'
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc'


export const getAllCart = () => {
    return {
        type: "GET_CART",
        payload: axios.get(urls + `cart`, {
            headers: {
                token: token
            }
        }),
        payloadQty: axios.get(urls + `cart/qty`, {
            headers: {
                token: token
            }
        })
    }
}

export const addProductToCart = (data) => {
    return {
        type: "ADD_CART",
        payload: axios.post(urls + 'cart', data, {
            headers: {
                token: token
            }
        })
    }
}

export const checkOutAll = (data) => {
    return {
        type: "CHECKOUT",
        payload: axios.post(process.env.REACT_APP_URL + 'cart/checkout', data, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}

export const deleteAll = () => {
    return {
        type: "DELETEALL",
        payload: axios.delete(process.env.REACT_APP_URL + 'cart/all', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}

export const deleteCart = (id_cart) => {
    return {
        type: "DELETECART",
        payload: axios.delete(process.env.REACT_APP_URL + `cart?id_cart=${id_cart}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}

export const getDetail = (faktur) => {
    return {
        type: "DETAIL",
        payload: axios.get(process.env.REACT_APP_URL + `payment?faktur=${faktur}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}

export const addQty = (id_cart) => {
    return {
        type: "ADDQTY",
        payload: axios.patch(process.env.REACT_APP_URL + `cart/add/${id_cart}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}
export const minQty = (id_cart) => {
    return {
        type: "MINQTY",
        payload: axios.patch(process.env.REACT_APP_URL + `cart/min/${id_cart}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}


export const getQty = (qty) => {
    return {
        type: 'QTY',
        payload: qty
    }
}