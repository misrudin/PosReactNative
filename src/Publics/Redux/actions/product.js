import axios from 'axios';
import {Link} from '../../env';
const URL = Link();

export const getAllProduct = token => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(URL + 'product/all', {
      headers: {
        token: token,
      },
    }),
  };
};
export const addProduct = (fd, token) => {
  return {
    type: 'ADD_PRODUCT',
    payload: axios.post(URL + 'product', fd, {
      headers: {
        token: token,
      },
    }),
  };
};
export const deleteProduct = (id, token) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete(URL + `product/${id}`, {
      headers: {
        token: token,
      },
    }),
  };
};
export const editProduct = (id, fd, token) => {
  return {
    type: 'EDIT_PRODUCT',
    payload: axios.patch(URL + `product/${id}`, fd, {
      headers: {
        token: token,
      },
    }),
  };
};

export const pagination = (key, page, token) => {
  return {
    type: 'PAGE',
    payload: axios.get(URL + `product?key=${key}&page=${page}`, {
      headers: {
        token: token,
      },
    }),
  };
};
