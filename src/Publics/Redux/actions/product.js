import axios from 'axios'

const urls = "http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc'


export const getAllProduct = () => {
    return {
        type: "GET_PRODUCT",
        payload: axios.get(urls + 'product/all', {
            headers: {
                token: token
            }
        })
    }
}
export const addProduct = (fd) => {
    return {
        type: "ADD_PRODUCT",
        payload: axios.post(urls + 'product', fd, {
            headers: {
                token: token
            }
        })
    }
}

export const filterProduct = (key) => {
    console.log(key)
    return {
        type: "FIL_PRODUCT",
        payload: axios.post(urls + `product/filter?keyword${key}`, {
            headers: {
                token: token
            }
        })
    }
}
export const deleteProduct = (id) => {
    return {
        type: "DELETE_PRODUCT",
        payload: axios.delete(urls + `product/${id}`, {
            headers: {
                token: token
            }
        })
    }
}
// export const editProduct = (id, fd) => {
//     return {
//         type: "EDIT_PRODUCT",
//         payload: axios.patch(process.env.REACT_APP_URL + `product/${id}`, fd, {
//             headers: {
//                 token: localStorage.getItem('Token')
//             }
//         })
//     }
// }

// export const pagination = (page, category, keyword) => {
//     return {
//         type: "PAGE",
//         payload: axios.get(process.env.REACT_APP_URL + `product?page=${page}&keyword=${keyword}&category=${category}`, {
//             headers: {
//                 token: localStorage.getItem('Token')
//             }
//         })
//     }
// }


