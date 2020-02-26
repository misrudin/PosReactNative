import axios from 'axios';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

export const getAllCart = () => {
  return {
    type: 'GET_CART',
    payload: axios.get(urls + `cart`, {
      headers: {
        token: token,
      },
    }),
    payloadQty: axios.get(urls + `cart/qty`, {
      headers: {
        token: token,
      },
    }),
  };
};

export const addProductToCart = data => {
  return {
    type: 'ADD_CART',
    payload: axios.post(urls + 'cart', data, {
      headers: {
        token: token,
      },
    }),
  };
};

export const checkOutAll = data => {
  return {
    type: 'CHECKOUT',
    payload: axios.post(urls + 'cart/checkout', data, {
      headers: {
        token: token,
      },
    }),
  };
};

export const deleteAll = () => {
  return {
    type: 'DELETEALL',
    payload: axios.delete(urls + 'cart/all', {
      headers: {
        token: token,
      },
    }),
  };
};

export const deleteCart = id_cart => {
  return {
    type: 'DELETECART',
    payload: axios.delete(urls + `cart?id_cart=${id_cart}`, {
      headers: {
        token: token,
      },
    }),
  };
};

export const getDetail = faktur => {
  return {
    type: 'DETAIL',
    payload: axios.get(process.env.REACT_APP_URL + `payment?faktur=${faktur}`, {
      headers: {
        token: localStorage.getItem('Token'),
      },
    }),
  };
};

export const addQty = id_cart => {
  return {
    type: 'ADDQTY',
    payload: axios.patch(urls + `cart/add/${id_cart}`, {
      headers: {
        token: token,
      },
    }),
  };
};
export const minQty = id_cart => {
  return {
    type: 'MINQTY',
    payload: axios.patch(urls + `cart/min/${id_cart}`, {
      headers: {
        token: token,
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
