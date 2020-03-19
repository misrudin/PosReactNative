import axios from 'axios';
import {Link} from '../../env';

const URL = Link();

export const getAllCategory = token => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(URL + 'category', {
      headers: {
        token: token,
      },
    }),
  };
};

export const addCategory = (data, token) => {
  return {
    type: 'ADD_CATEGORY',
    payload: axios.post(URL + 'category', data, {
      headers: {
        token: token,
      },
    }),
  };
};
export const deleteCategory = (id, token) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(URL + `category/${id}`, {
      headers: {
        token: token,
      },
    }),
  };
};
export const editCategory = (data, token) => {
  return {
    type: 'EDIT_CATEGORY',
    payload: axios.patch(URL + `category/${data.id}`, data, {
      headers: {
        token: token,
      },
    }),
  };
};
