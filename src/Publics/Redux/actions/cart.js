import axios from 'axios';
import {Link} from '../../env';

const URL = Link();

export const getAllCart = token => {
  return {
    type: 'GET_CART',
    payload: axios.get(URL + 'cart', {
      headers: {
        token: token,
      },
    }),
  };
};

export const addProductToCart = (data, token) => {
  return {
    type: 'ADD_CART',
    payload: axios.post(URL + 'cart', data, {
      headers: {
        token: token,
      },
    }),
  };
};

export const checkOutAll = (data, token) => {
  return {
    type: 'CHECKOUT',
    payload: axios.post(URL + 'cart/checkout', data, {
      headers: {
        token: token,
      },
    }),
  };
};

export const deleteAll = token => {
  return {
    type: 'DELETEALL',
    payload: axios.delete(URL + 'cart/all', {
      headers: {
        token: token,
      },
    }),
  };
};

export const deleteCart = (id_cart, token) => {
  return {
    type: 'DELETECART',
    payload: axios.delete(URL + `cart?id_cart=${id_cart}`, {
      headers: {
        token: token,
      },
    }),
  };
};

export const getDetail = (faktur, token) => {
  return {
    type: 'DETAIL',
    payload: axios.get(URL + `payment?faktur=${faktur}`, {
      headers: {
        token: token,
      },
    }),
  };
};

export const addQty = id_cart => {
  return {
    type: 'ADDQTY',
    payload: axios.patch(URL + `cart/add/${id_cart}`, {
      headers: {
        token: localStorage.getItem('Token'),
      },
    }),
  };
};
export const minQty = id_cart => {
  return {
    type: 'MINQTY',
    payload: axios.patch(URL + `cart/min/${id_cart}`, {
      headers: {
        token: localStorage.getItem('Token'),
      },
    }),
  };
};

export const getQty = qty => {
  return {
    type: 'QTY',
    payload: qty,
  };
};

export const getTotal = total => {
  return {
    type: 'TOTAL',
    payload: total,
  };
};
