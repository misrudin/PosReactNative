import axios from 'axios'
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/'
console.log(process.env.URL_STRING);


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc'



export const getAllCategory = () => {
    return {
        type: "GET_CATEGORY",
        payload: axios.get(urls + 'category', {
            headers: {
                token: token
            }
        })
    }
}

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post(urls + 'category', data, {
            headers: {
                token: token
            }
        })
    }
}
export const deleteCategory = (id) => {
    return {
        type: "DELETE_CATEGORY",
        payload: axios.delete(urls + `category/${id}`, {
            headers: {
                token: token
            }
        })
    }
}
export const editCategory = (data) => {
    return {
        type: "EDIT_CATEGORY",
        payload: axios.patch(urls + `category/${data.id}`, data, {
            headers: {
                token: token
            }
        })
    }
}
